
# Hotel Web Dashboard

This Web Dashboard was created in Flask and vuejs

## How to migrate

- Change the `url` value in `repository.json` to `https://github.com/{user}/{repo}` 

- Change the `repository` value in `addons.yaml` to `https://github.com/{user}/{repo}` 
- Change the `image` value in `addons.yaml` to `ghcr.io/{user}/{repo}:latest`. The image should automatically build and you can verify that by clicking the actions tab in the github repo 
- Change the `url` value in `dash\config.yaml` to `https://github.com/{user}/{repo}` 
- Change the `username` value in `.github\workflows\build-push.yml` to your new username
- Change the `tags` value in `.github\workflows\build-push.yml` to `ghcr.io/{user}/{repo}:latest`

if you change the `target` value in `addons.yaml` then change the `slug` in `dash\config.yaml` to the same value