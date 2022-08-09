# GOAT management dashboard
The GOAT management dashboard is created for configuring GOAT. It mostly allows CRUD the things across all resources

## Run it locally

1. clone the repository into your local machine

```bash
git clone https://github.com/goat-community/dashboard/
```

2. install `pnpm` or `yarn`, then you can run the below command to install all dependencies needed before the run
```bash
pnpm install
```
How to install pnpm? https://pnpm.io/installation

3. Run the project with the `pnpm dev` command

## Structure Overview

#### Common
Components that are used widely in the project like buttons

#### Types
TypeScript-based declared and static types for component inputs, API inputs, API results

#### Context
In most cases the context and stores are handled by the React Admin but in some places we have a custom one for ourselves like the Login 
flow and context + all the API side effects are written in redux action (thunk) format here

#### Api
All the APIs will be exported from their [resource].TSX file in this folder, with axios-based instance

#### Hooks
Custom hooks we made to use across the project

#### Pages
The pages you see in the dashboard are one of the two-page types we have, 

1. the custom ones we made like the Login page that doesn't have any CRUD inside
2. the React Admin resources (I'll describe them then :D ) pages.

Some of our pages don't need any CRUD or table to showcase lists and... or maybe they don't worth developing with RA, so we have them here : )

#### Styles
We have 3 main style files
1. main.scss
in this file, we have styles of the most common component and public styles
2. variables.scss
As it name, we store variables here
3. theme.TSX
Customization of the RA default template

#### Utils
Utility functions that use across the project

#### React Admin
the main framework here is React Admin, it's such a big framework, but we only use some of its functionalities in our project,
Like Resource, dataProvider, Router, Translation, and...
