async function check_metamask(){
    try{
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = await new Web3(window.ethereum);
            return true;
        }  
    }catch(e){
        console.log(e)
    }
    return false;
}