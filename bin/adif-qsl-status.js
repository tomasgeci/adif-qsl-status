#!/usr/bin/env node

import {readFileSync, writeFile} from 'fs';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers'
import chalk from 'chalk';
import boxen from 'boxen';
import {AdifFormatter, AdifParser} from 'adif-parser-ts';
import path from 'path'

const cliOptions = yargs(hideBin(process.argv))
    .usage("Usage: -f <file> -m <manager>")
    .version('1.0.0')
    .option('f', {
        alias: "file",
        describe: "Path to ADIF file ",
        type: "string",
        demandOption: true
    })
    .option('s', {
        alias: "status",
        describe: "ADIF QSL_SENT: N - No, R - Requested, Q - Queued, Y - Yes, I - Invalid",
        type: "string",
        demandOption: true
    })
    .argv

const loadedMsg = chalk.white.bold(`Loaded ADIF file ${cliOptions.file}`)

const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#0b0c0b"
};

console.log(boxen(loadedMsg, boxenOptions));

let start = new Date();

try {

    let adifFileContent = readFileSync(cliOptions.file, 'utf8');
    let adifContent = AdifParser.parseAdi(adifFileContent);
    let qsoCount = adifContent.records.length;
    let updatedQsoRecords = [];
    let inputFilePathDir = path.parse(cliOptions.file).dir === '' ? '' : path.parse(cliOptions.file).dir + '/';
    let inputFilePathFilename = path.parse(cliOptions.file).name;
    let outputFinishedFilePath = `${inputFilePathDir}finished_${inputFilePathFilename}.adi`;
    let qslSent = cliOptions.status.substring(0,1).toUpperCase();

    adifContent.records.forEach(qso => {
        qso['qsl_sent'] = qslSent;
        updatedQsoRecords.push(qso);
    });

    writeFile(
        outputFinishedFilePath,
        AdifFormatter.formatAdi({header: adifContent.header, records: updatedQsoRecords}),
        function (err) {
            if (err) {
                return console.log(err);
            }
        });

    const qsoResult = chalk.green.bold(`Processed ${cliOptions.file} with ${qsoCount} QSO records.\n
    Set QSL_SENT to value ${qslSent}`);

    console.log(boxen(qsoResult, boxenOptions));
    console.log('Execution time: %dms', new Date() - start);

} catch (err) {
    console.error(err)
}
