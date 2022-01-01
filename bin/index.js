#!/usr/bin/env node

import { Command } from 'commander';
import { getPDF } from './scraper.js'

const app = new Command();

// create a description for the app
app.description('A tool for retrieving pdf/epub novels from boxnovel.com')

// define pdf command
app.command('pdf <title>').action(async (title) => {
    await getPDF(title)
})

// run the app
app.parse()
