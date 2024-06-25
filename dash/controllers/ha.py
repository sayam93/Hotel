import asyncio
import websockets
import threading
from helpers.app import log_error, json
from helpers.app import *
from controllers.app import App
app=App()
class HomeAssistant:
    def __init__(self):
        thread = threading.Thread(target=self.run_asyncio_loop)
        thread.start()
        self.connection=None
        self.is_connected = False
        self.error_count = 0
    async def connect_to_home_assistant(self):
        global connection
        async with websockets.connect(HASS_URL) as websocket:
            self.connection=websocket
            try:
                await websocket.send(json.dumps({
                    "type": "auth",
                    "access_token": HASS_TOKEN
                }))
                print("connection successful")
            except:
                # terminate here
                print("failed to connect")
                
            try:
                async for message in websocket:
                    data = json.loads(message)
                    if data.get('type') == 'auth_invalid':
                        log_error(True)
                    elif data.get('type') == 'auth_ok':
                        log_error(False)
                        print("Authenticated successfully")
                        app.entities()
                        await websocket.send(json.dumps({"id": 1, "type": "subscribe_events"}))
                    else:
                        log_error(False)
                        print(data.get('type'))
                        global home_assistant_data
                        home_assistant_data = data
                        if data.get('type') == "event":
                            if data['event']['event_type'] == "state_changed":
                                # print("received state change")
                                app.entities()
            # except websockets.exceptions.ConnectionClosedError:
            except:
                self.error_count+=1
                if self.error_count>2:
                    log_error(False)
                await asyncio.sleep(2)
                print("Connection closed unexpectedly. Reconnecting...")
                thread = threading.Thread(target=self.run_asyncio_loop)
                thread.start()
                    


    def run_asyncio_loop(self):
        asyncio.run(self.connect_to_home_assistant())
    async def call_service(self,room):
        if self.connection:
            resp=await self.connection.send(json.dumps({
                "type": "call_service",
                "domain": "homeassistant",
                "service":"toggle" ,
                "service_data": { "entity_id": f"input_boolean.{room}" },
                "target": { "entity_id": f"input_boolean.{room}" },
            }))
            # response = await connection.recv()
            print(f"Service call response: {resp}")