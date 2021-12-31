var graphHelper = {

}

graphHelper.get = async (query) =>{
    const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query
        })
      };
    
    let r = await fetch(`https://cello-graphnode.overclockedbrains.co/subgraphs/name/devtycoon`, options)
    r = await r.json()
    return r;
}