# hypervibes-frontend

Frontend app for the [**HyperVIBES**](https://hypervibes.xyz) project.

## Links

* [Product Brief](https://docs.google.com/document/d/1NvztqdMAyLERTPuX5uHSnq8f5G0YVRaxNsq5UaXhQEw/edit?usp=sharing)
* [MVP Coordination Doc](https://docs.google.com/document/d/1dpMlzGeO4XfD6gBQoaTTXO2NxCCfA0hDYlTinJjCsfQ/edit?usp=sharing)
* [Contracts repo](https://github.com/R-Group-Devs/hypervibes-contracts)

## Requirements

- [Node](https://nodejs.org/en/) ^14.x
- [Yarn](https://yarnpkg.com/) ^1.22.x

## Setup

Clone the repo:

```sh
$ git clone git@github.com:R-Group-Devs/hypervibes-frontend.git
```

## Development

Install dependencies:

```sh
$ yarn
```

Generate **Ethereum** and **Rinkeby** RPC endpoints using [Infura](https://infura.io/) or [Alchemy](https://www.alchemy.com/) and add the following environment variables to a `.env.local` file:

```
REACT_APP_ETHEREUM_RPC_URL=???
REACT_APP_RINKEBY_RPC_URL=???
```

Run the app in development mode:

```sh
$ yarn start
```

Generate a browser-ready build artifact:

```sh
$ yarn build
```

