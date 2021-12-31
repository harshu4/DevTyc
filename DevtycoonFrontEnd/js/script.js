const jobs_name=["Full-stack developer","Senior software engineer","Data scientist","Cloud engineer","IT security specialist","Network Administrator","Database Administrator","Devops Engineer"]
const vidoes =["https://bafybeicaw6qjtgfkyfz3firooda23vf5es2tv6dhj4im3bx4pmsjppjp7y.ipfs.infura-ipfs.io/","https://gateway.pinata.cloud/ipfs/QmXdAoQBetYKHHzG5qj1kY1cEQid7F4WgD2Vq2h9QNxXpa","https://bafybeideg7skscb6lkf53rhjwebwajhoe4ymwzqd3cfy5mszteik4acswq.ipfs.infura-ipfs.io/","https://bafybeid5rnj5od26vdlooenpwa2wfesy7xhh77csoiizs5sjnvkfrdbbsm.ipfs.infura-ipfs.io/","https://bafybeibpeuhfnnmtdqidextaiqsvrfqyb2yrhr4rnw25ippy5kqlem2sqa.ipfs.infura-ipfs.io/","https://bafybeibmzeqs7cau7egyzzunsfqudf5o6xrqprzkzqmphlne4k225ftuca.ipfs.infura-ipfs.io/","https://bafybeibpeuhfnnmtdqidextaiqsvrfqyb2yrhr4rnw25ippy5kqlem2sqa.ipfs.infura-ipfs.io/"]
const contract_address = "0x9FaE81D4889DA0aa84fE0Ef99E412f4E7e992e64"

var msg =""
var indicate_wallet = false
var isVideoInit = false

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function startVideo(){
    try{
        $("body").append(`<video id="videoabc" controls autoplay style="margin-left: auto; margin-right: auto; position: absolute; left:0;right:0;" id="my-player" ><source src=${vidoes[Math.floor(Math.random() * vidoes.length)]} type="video/mp4"></video>`)
       isVideoInit = true;
       /*
        var videoId = getRandomInt(vidoes.length)
        const optionalHlsOpts = null;
        const optionalThetaOpts = {
          allowRangeRequests: true, // false if cdn does not support range headers  
        };
        const player = window.player = videojs('my-player', {
                techOrder: ["theta_hlsjs", "html5"],
                sources: [{
                  src: vidoes[videoId],
                  type: "application/vnd.apple.mpegurl",
                  label: "1080p"
                }],
                width: window.innerWidth*80/100, height: window.innerHeight*80/100,
                theta_hlsjs: {
                    videoId: String(videoId),
                    userId: "0", 
                    onThetaReady: null, // optional listener
                    onStreamReady: null, // optional listener
                    hlsOpts: optionalHlsOpts,
                    thetaOpts: optionalThetaOpts,
                }
            });
            player.play()*/
                        
        //Core._('#vdialog').setAttribute('open', true)
    }catch(e){
        console.error(e)
    }
}

function closeVideo(){
    try{
        isVideoInit = false
        $('#videoabc').remove();
        //Core._('#vdialog').removeAttribute('open')
    }catch(e){
        console.error(e)
    }
}
  
$("#metamask-btn").click(async ()=>{
    Core.addToShowcase("Connecting with metamask...")
    let isWeb3Available = await check_metamask()
    if(isWeb3Available){
        let chain_id = await web3.eth.net.getId()
        if(chain_id!=588){
            Core.addToShowcase("Please switch to Metis stardust test network!")
            return;
        }
        $("#metamask-btn").hide();
        Core.addToShowcase("Fetching user details from Metis network...")
        let notfirst = false;
        setInterval(async ()=>{
            if(notfirst){
                notfirst=true;
            }else{
                Core.addToShowcase("Syncing...")
            }
            let msgx =await updateUserDetails()
            if(msgx && !indicate_wallet){
                Core.addToShowcase(msgx)
            }else{
                Core.addToShowcase(msg)
            }
        },5000)
    }else{
        Core.addToShowcase("Please install metamask!")
    }
})

async function updateUserDetails(){
    let message = ""
    let address = (await web3.eth.getAccounts())[0];
    $("#address").text(address)
    let q = `{ users(where :{id: ${JSON.stringify(address.toLowerCase())} }){
          id
          coffee
          energy
          chocolate
          work
          computerlevel
          level
          energy
          isworking
          faucet
          worklist {
                id
                reward
                started
                givenblock
                startblock
                totalblock
                endblock
                notcompleted
            }
        }
    }
    ` 
    let coffee = 0
    let chocolate = 0
    let energy = 0
    let res  = await graphHelper.get(q)
    let data = res['data']
    if(data.hasOwnProperty('users') && data['users'].length>0){
        let user = data['users'][0]
        
        if(user.hasOwnProperty('faucet')){
            if(user['faucet']){
                Core._('#fwk').setAttribute('disabled', true)
            }else{
                Core._('#fwk').removeAttribute('disabled')
            }
        }else{
            Core._('#fwk').removeAttribute('disabled')
        }

        if(user.hasOwnProperty("work") && user['work']){
            $("#wk").text(web3.utils.fromWei(user['work'], 'ether'))
        }else{
            $("#wk").text('0')
        }
        if(user.hasOwnProperty("chocolate") && user['chocolate']){
            chocolate = web3.utils.fromWei(user['chocolate'], 'ether')
            $("#choclates").text(web3.utils.fromWei(user['chocolate'], 'ether'))
        }else{
            $("#choclates").text('0')
        }
        if(user.hasOwnProperty("coffee") && user['coffee']){
            coffee = web3.utils.fromWei(user['coffee'], 'ether')
            $("#coffee").text(web3.utils.fromWei(user['coffee'], 'ether'))
        }else{
            $("#coffee").text('0')
        }
        if(user.hasOwnProperty("energy") && user['energy']){
            energy = web3.utils.fromWei(user['energy'], 'ether')
            $("#energy_drinks").text(web3.utils.fromWei(user['energy'], 'ether'))
        }else{
            $("#energy_drinks").text('0')
        }
        if(user.hasOwnProperty("level")){
            $("#exp_level").text(user['level'])
        }else{
            $("#exp_level").text('0')
        }
        if(user.hasOwnProperty("computerlevel")){
            $("#comp_level").text(user['computerlevel'])
        }else{
            $("#comp_level").text('0')
        }

         
        
       
        if(user.hasOwnProperty('worklist')){
            let current_block =  await web3.eth.getBlockNumber()
            let worklist = user['worklist']
            if(worklist.length>0){
                let work = worklist[worklist.length-1]
                if(work['started'] && work['notcompleted']){
                    if(current_block> Number(work['endblock'])){
                        Core._('#start-job-search').setAttribute('disabled', true)
                        Core._('#takeJob').setAttribute('disabled', true)
                        Core._('#claimReward').removeAttribute('disabled')
                        $("#job-finder-status").text('Finished')
                        message = "Please! collect your work reward.";
                        closeVideo()
                    }else{
                        Core._('#start-job-search').setAttribute('disabled', true)
                        Core._('#takeJob').setAttribute('disabled', true)
                        Core._('#claimReward').setAttribute('disabled', true)
                        $("#job-finder-status").text('Working')
                        message = "Watch videos powered by theta video api and earn tokens while you working!"
                        if(!isVideoInit){
                            startVideo()
                        }                        
                    }
                    let job = jobs_name[(Number(work["id"].split("-")[1])-1)%jobs.length]
                    $("#job_data").empty()
                    $("#job_data").append(`<li>${job}</li>`)
                    $("#job_data").append(`<li>Reward: ${work['reward']} WK</li>`)
                    $("#job_data").append(`<li>Blocks Remaining: ${ Number(work['endblock'])-current_block <0?0:Number(work['endblock'])-current_block}</li>`)
                }else if(work['started']  && !work['notcompleted']){
                    Core._('#start-job-search').removeAttribute('disabled')
                    Core._('#takeJob').setAttribute('disabled', true)
                    Core._('#claimReward').setAttribute('disabled', true)
                    message = "Earn worktoken by completing jobs."
                    $("#job-finder-status").text('Unemployed')
                    $("#job_data").empty()
                    closeVideo()
                }else{
                    Core._('#start-job-search').setAttribute('disabled', true)
                    Core._('#takeJob').removeAttribute('disabled')
                    Core._('#claimReward').setAttribute('disabled', true)
                    let job = jobs_name[(Number(work["id"].split("-")[1])-1)%jobs.length]
                    $('#takeJob').attr('reward',Number(work['reward']))
                    $('#takeJob').attr('total_blocks',Number(work['totalblock']))
                    $('#takeJob').attr('coffee',Number(coffee))
                    $('#takeJob').attr('choclate',Number(chocolate))
                    $('#takeJob').attr('energy',Number(energy))
                    $("#job_data").empty()
                    $("#job_data").append(`<li>${job}</li>`)
                    $("#job_data").append(`<li>Reward: ${work['reward']} WK</li>`)
                    $("#job_data").append(`<li>Time limit: ${Number(work['totalblock'])} blocks</li>`)
                    closeVideo()
                    message = "Please! accept the opportunity."
                }
            }else{
                $("#job-finder-status").text('Unemployed')
                Core._('#start-job-search').removeAttribute('disabled')
                message = "Earn worktoken by completing jobs."
                $("#job_data").empty()
                closeVideo()
            }
        }

        
    }else{
        Core._('#fwk').removeAttribute('disabled')
        $("#choclates").text('0')
        $("#coffee").text('0')
        $("#energy_drinks").text('0')
        $("#exp_level").text('0')
        $("#comp_level").text('0')
        $("#job-finder-status").text('Unemployed')
        $("#wk").text('0')
        message = "Use faucet to get start!"
    }
    return message;
}

$("#takeJob").click(()=>{
    $("#bco").text($("#takeJob").attr('coffee'))
    $("#bc").text($("#takeJob").attr('choclate'))
    $("#bed").text($("#takeJob").attr('energy'))
    $("#startw").text(`Remaining: ${Number($("#takeJob").attr('total_blocks'))}`)

    $("#bco").attr('val',$("#takeJob").attr('coffee'))
    $("#bcot").attr('val',0)
    $("#bc").attr('val',$("#takeJob").attr('choclate'))
    $("#bct").attr('val',0)
    $("#bed").attr('val',$("#takeJob").attr('energy'))
    $("#bedt").attr('val',0)
    $("#startw").attr('val',Number($("#takeJob").attr('total_blocks')))

    $("#bcot").text(`Coffee: 0`)
    $("#bedt").text(`Energy Drinks: 0`)
    $("#bct").text(`Choclates: 0`)
    Core._('#xrv').setAttribute('open', true)
})

$("#close_dialog").click(()=>{
    Core._('#xrv').removeAttribute('open')
})

$("#bco").click(()=>{   
    let v = Number($("#bco").attr('val'))
    let a = Number($("#bcot").attr('val'))
    let t = Number($("#startw").attr('val'))
    if(t<=0){
        $("#startw").text(`Start`)
        return;
    }
    if(v>0){
        v-=1;
        a+=1
        t-=1
    }
    $("#bco").attr('val',v)
    $("#bcot").attr('val',a)
    $("#startw").attr('val',t)
    $("#bco").text(v)
    $("#bcot").text(`Coffee: ${a}`)
    $("#startw").text(`Remaining: ${t}`)
    if(t<=0){
        $("#startw").text(`Start`)
    }
})

$("#bc").click(()=>{
    let v = Number($("#bc").attr('val'))
    let a = Number($("#bct").attr('val'))
    let t = Number($("#startw").attr('val'))
    if(t<=0){
        $("#startw").text(`Start`)
        return;
    }
    if(v>0){
        v-=1;
        a+=1
        t-=3
    }
    $("#bc").attr('val',v)
    $("#bc").text(v)
    $("#bct").attr('val',a)
    $("#startw").attr('val',t)
    $("#bct").text(`Choclates: ${a}`)
    $("#startw").text(`Remaining: ${t}`)
    if(t<=0){
        $("#startw").text(`Start`)
    }
})

$("#bed").click(()=>{
    let v = Number($("#bed").attr('val'))
    let a = Number($("#bedt").attr('val'))
    let t = Number($("#startw").attr('val'))
    if(t<=0){
        $("#startw").text(`Start`)
        return;
    }
    if(v>0){
        v-=1;
        a+=1
        t-=3
    }
    $("#bed").attr('val',v)
    $("#bed").text(v)
    $("#bedt").attr('val',a)
    $("#startw").attr('val',t)
    $("#bedt").text(`Energy Drinks: ${a}`)
    $("#startw").text(`Remaining: ${t}`)
    if(t<=0){
        $("#startw").text(`Start`)
    }
})

$("#startw").click(async ()=>{
    let t = Number($("#startw").attr('val'))
    if(t>0){
        return;
    }
    let address = await web3.eth.getAccounts();
    let contract = await new web3.eth.Contract(ABI, contract_address);
    Core._('#xrv').removeAttribute('open')
    msg = "Waiting transaction confirmation..."
    indicate_wallet = true
    await contract.methods.takework(Number($("#bcot").attr('val')), Number($("#bct").attr('val')), Number($("#bedt").attr('val'))).send({
        from: address[0]
    });
    indicate_wallet = false
    msg = "Watch videos powered by theta api and earn tokens while you working!"
    updateUserDetails()
})

$("#claimReward").click(async ()=>{
    let address = await web3.eth.getAccounts();
    let contract = await new web3.eth.Contract(ABI, contract_address);
    msg = "Waiting transaction confirmation..."
    indicate_wallet = true
    await contract.methods.completework().send({
        from: address[0]
    });
    indicate_wallet = false
    updateUserDetails()
    $("#job_data").empty()
})

$("#start-job-search").click(async ()=>{
    let address = await web3.eth.getAccounts();
    let contract = await new web3.eth.Contract(ABI, contract_address);
    msg = "Waiting transaction confirmation..."
    indicate_wallet = true
    await contract.methods.getwork().send({
        from: address[0]
    });
    indicate_wallet = false
    updateUserDetails()
})

$("#fwk").click(async ()=>{
    let address = await web3.eth.getAccounts();
    let contract = await new web3.eth.Contract(ABI, contract_address);
    msg = "Waiting transaction confirmation..."
    indicate_wallet = true
    await contract.methods.getStarted().send({
        from: address[0]
    });
    indicate_wallet = false
    updateUserDetails() 
})