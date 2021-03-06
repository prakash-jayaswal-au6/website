import * as BigNumber from 'bignumber.js';
import * as _ from 'lodash';
import * as React from 'react';
import {ZeroEx} from '@0xproject/0x.js';
import {ValidatedBigNumberCallback} from 'ts/types';
import {BalanceBoundedInput} from 'ts/components/inputs/balance_bounded_input';
import {constants} from 'ts/utils/constants';

interface EthAmountInputProps {
    label: string;
    balance: BigNumber.BigNumber;
    amount?: BigNumber.BigNumber;
    onChange: ValidatedBigNumberCallback;
    shouldShowIncompleteErrs: boolean;
    onVisitBalancesPageClick?: () => void;
}

interface EthAmountInputState {}

export class EthAmountInput extends React.Component<EthAmountInputProps, EthAmountInputState> {
    public render() {
        const amount = this.props.amount ?
            ZeroEx.toUnitAmount(this.props.amount, constants.ETH_DECIMAL_PLACES) :
            undefined;
        return (
            <div className="flex overflow-hidden" style={{height: 84}}>
                <BalanceBoundedInput
                    label={this.props.label}
                    balance={this.props.balance}
                    amount={amount}
                    onChange={this.onChange.bind(this)}
                    shouldCheckBalance={true}
                    shouldShowIncompleteErrs={this.props.shouldShowIncompleteErrs}
                    onVisitBalancesPageClick={this.props.onVisitBalancesPageClick}
                />
                <div style={{paddingTop: 44}}>
                    ETH
                </div>
            </div>
        );
    }
    private onChange(isValid: boolean, amount?: BigNumber.BigNumber) {
        const baseUnitAmountIfExists = _.isUndefined(amount) ?
            undefined :
            ZeroEx.toBaseUnitAmount(amount, constants.ETH_DECIMAL_PLACES);
        this.props.onChange(isValid, baseUnitAmountIfExists);
    }
}
