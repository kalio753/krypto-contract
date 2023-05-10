// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

error Transaction__TransferFailed();

contract Transaction {
    uint256 txCount;

    event Transfer(
        address from,
        address to,
        uint amout,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function someName(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public payable {
        txCount += 1;

        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        (bool success, ) = receiver.call{value: address(this).balance}("");
        if (!success) {
            revert Transaction__TransferFailed();
        }

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionsCount() public view returns (uint256) {
        return txCount;
    }
}
