import requests
from requests import Response
import re
import json
from typing import Dict, List, Optional, Tuple,Collection
from flask import Flask,render_template,request,jsonify
from helpers.app import *
class App():
    def __init__(self):
        self.__timeout = 20
        self.proxies={}
        self.error_code=200
        if not file_exists(storage_path('auth.json')):
            return 
        file=get_json_file_content(storage_path('auth.json'))
        if not 'hassUrl' in file or not 'access_token' in file:
            return 
        if file['access_token'] is None:
            return

    def _request(
        self,
        url: str,
        header: Optional[dict] = None,
        json: Optional[dict] = None,
        data: Optional[dict] = None,
        params: Optional[dict] = None,
        verb: str = "GET",
        auth_needed: bool = True,
        is_json: bool = True,
        **kwargs,
    ) -> Response:
        request_headers={}
        if auth_needed:
            request_headers['Authorization']=f"Bearer {HASS_TOKEN}"
        if is_json:
            request_headers['Content-Type']="application/json"
            request_headers['Accept']="application/json"
            
        if not url.startswith("http"):
            return None
        if header:
            request_headers=header
        try:
            response = requests.request(
                method=verb,
                url=url,
                headers=request_headers,
                json=json,
                timeout=self.__timeout,
                params=params,
                data=data,
                proxies=self.proxies,
                **kwargs,
            )
        except requests.HTTPError as ex:
            raise Exception({"message":ex})
            # raise LibraryError({"message": ex.args})
            pass
        self.error_code=response.status_code
        return response
    def _parse_response(self, response: Response) -> dict:
        """
        :param response: Response from graph api.
        :return: json data
        """
        # print(response.text)
        if response.ok:
            try:
                data = response.json()
            except:
                data=json.loads(response.text.replace("'", '"'))
            return data["data"] if "data" in data else data
        elif response.status_code==401:
            return None
        elif response.status_code==404:
            return None
        elif response!=None:
            return None

    def set_auth(self,token,host,device):
        token_data={"access_token": token, "token_type": "Bearer", "refresh_token":None,  "ha_auth_provider": "homeassistant", "hassUrl": host, "clientId": host}
        save_to_file(storage_path('auth.json'),json.dumps(token_data))
        devices=get_json_file_content(storage_path('secure.json'))
        if devices is None:
            return False
        devices.append(device)
        save_to_file(storage_path('secure.json'),json.dumps(devices))
        return True

    def api(self):
        print(HASS_API)
        data=self._request(HASS_API)
        if data is None:
            return None
        if data.status_code in [200,201]:
            # set device config upon login
            return True
        else:
            return data.status_code
    def entities(self):
        data=self._request(f"{HASS_API}states",verb="GET")
        data=self._parse_response(data)
        # print(json.dumps(data))
        print("updating")
        if data is not None:
            filtered_rooms=filter_rooms(data)
            room_labels=self.get_template(filtered_rooms)
            if room_labels is None:
                # report error
                return False
            new_labels={}
            new_rooms=[]
            for key,value in room_labels.items():
                new_labels[value]=to_capital_case(value)
            for item in filtered_rooms:
                room_label=find_key_by_value(room_labels,item['id'])
                if room_label is not None:
                    item['label']=room_label
                    new_rooms.append(item)
            save_to_file(storage_path("entities.json"),json.dumps({'rooms':new_rooms,'labels':new_labels}))
            
            return True
        # print(json.dumps(data))
        else:
            # report error here
            return False
    def update_entity(self,request:dict):
        data=self._request(f"{HASS_API}states/input_boolean.{request['room']}",verb="POST",json={
            "state": request['state']
        })
        return True if data.status_code in [200,201] else False
    def get_template(self,rooms):
        template=room_template(rooms)
        data=self._request(f"{HASS_API}template",verb="POSt",json={
            "template":template
        })
        data=self._parse_response(data)
        print(json.dumps(data))
        usable_labels=parse_labels()
        if data is not None:
            new_data={}
            for key, value in data.items():
                try:
                    for item in value:
                        # case whre string might be sent
                        if "," in item:
                            sub_items=item.split(",")
                            for sub_item in sub_items:
                                if sub_item in usable_labels:
                                    new_data[key]=sub_item
                        else:
                            if item in usable_labels:
                                new_data[key]=item
                except:
                    pass
            return new_data
        return None
            # return {'status':True if self.error_code in [200,201] else False,'data':data}
        
    def run(self):
        # self.update_state()
        self.template()