pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{
        address newCampaign = new Campaign(minimum , msg.sender );
        deployedCampaigns.push(newCampaign);
    }

    function getDeployed() public view returns(address[]){
        return deployedCampaigns;
    }


}

contract Campaign{

    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool)  approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minContrib;
    mapping (address => bool) public approvers;
    uint public noOfApprovers = 0;

     modifier isManager(){
        require(msg.sender == manager);
        _;
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function Campaign(uint256 minCo,address managerAdd) public{
        manager = managerAdd;
        minContrib = minCo;
    }

    function contribute() public payable{
        require(minContrib < msg.value);
        approvers[msg.sender] = true;
        noOfApprovers++;
    }

    function createRequest(string desc,uint value,address recipient)
        public isManager{

        Request memory newReq = Request({
            description : desc,
            value : value,
            recipient : recipient,
            complete : false,
            approvalCount : 0
        });

        requests.push(newReq);

    }

    function approveRequest(uint id) public{

        Request storage request = requests[id];

        require(approvers[msg.sender] == true);
        require(request.approvals[msg.sender] != true);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint id) isManager public{
        Request storage request = requests[id];

        require(request.complete == false);
        require(request.approvalCount > (noOfApprovers/2));

        request.complete = true;
        request.recipient.transfer(request.value);
    }

    function getSummary() public view returns(
    uint,uint,uint,uint,address
    ){
        return (
          minContrib,
          address(this).balance,
          requests.length,
          noOfApprovers,
          manager
        );
    }

    function getRequestCount() public view returns(uint){
      return requests.length;
    }


}
