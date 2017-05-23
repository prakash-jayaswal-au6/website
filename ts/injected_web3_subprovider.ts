import * as _ from 'lodash';
import Web3 = require('web3');
import {constants} from 'ts/utils/constants';

/*
 * This class implements the web3-provider-engine subprovider interface and forwards
 * requests involving user accounts (getAccounts, sendTransaction, etc...) to the injected
 * web3 instance in their browser.
 * Source: https://github.com/MetaMask/provider-engine/blob/master/subproviders/subprovider.js
 */
export class InjectedWeb3SubProvider {
    private injectedWeb3: Web3;
    constructor(injectedWeb3: Web3) {
        this.injectedWeb3 = injectedWeb3;
    }
    public handleRequest(payload: any, next: any, end: any) {
        switch (payload.method) {
            case 'eth_accounts':
                this.injectedWeb3.eth.getAccounts(end);
                return;

            case 'eth_sendTransaction':
                const txParams = payload.params[0];
                this.injectedWeb3.eth.sendTransaction(txParams, end);
                return;

            case 'eth_sign':
                const address = payload.params[0];
                const message = payload.params[1];
                this.injectedWeb3.eth.sign(address, message, end);
                return;

            default:
                next();
                return;
        }
    }
    // Required to implement this method despite not needing it for this subprovider
    public setEngine(engine: any) {
        // noop
    }
}
