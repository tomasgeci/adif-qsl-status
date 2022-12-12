[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://supportukrainenow.org/)

# ADIF to VIA file decorator

Simple tool to batch QSL_SENT field update in provided adif file

*disclaimer:* this is raw prototype-like project, without further ambitions for fine-tuning and code quality improvements

## Install Nodejs and NPM

[https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## Install dependencies

- run `npm install`

## Example of usage

- export ADIF file with desired QSO from your LOG
- state values (examples, currently not limited list): `N - No`, `R - Requested`, `Q - Queued`, `Y - Yes`, `I - Invalid`
- run (example set QSL_SENT status to **Queued**)`node /bin/adif-qsl-status.js -f your_path/your_adif_file.adi -s Q`
- lookup for file with prefix `finished_`

## Devel

- tested with nodejs `16.*` on Windows 10
- update deps `npx npm-check-updates -u`

## TODO
