"use strict";
const support=require("./module-support");
function create(options){
  options=options||{};const s=options.support||support.create("microphone-protection"),engine=options.engine||require("./runtime/unknown-home-microphone").create();
  function unverified(e){const error=Error(e.message||String(e));error.code="PROTECTION_UNVERIFIED";return error;}
  function report(){let r;try{r=engine.status();}catch(e){throw unverified(e);}const saved=s.state();if(saved&&!saved.suspended&&saved.desired&&!r.enabled){r.enabled=true;r.verified=false;r.state="unverified";}const healthy=!r.enabled||r.verified;return Object.assign(r,{healthy,errorCode:healthy?undefined:"PROTECTION_UNVERIFIED",errorText:healthy?undefined:"Requested microphone protection could not be verified",requires:"Verified voice-service blocking in Privacy Protection when capture blocking is enabled"});}
  function maintain(){try{const saved=s.state();if(saved&&!saved.suspended&&saved.desired&&!engine.status().enabled)engine.change(true);else engine.reconcile();}catch(e){throw unverified(e);}}
  async function run(action,args){
    args=args||{};
    if(action==="enable"){s.claim();const saved=s.state();s.save({desired:saved?saved.desired===true:engine.status().enabled,suspended:false});maintain();}
    else if(action==="disable"){s.claim();s.suspend(engine.status().enabled);engine.change(false);}
    else if(action==="reconcile"||action==="maintenance"){s.claim();maintain();}
    else if(action==="setBlocking"){if(typeof args.enabled!=="boolean")throw Error("Expected enabled boolean");s.save({desired:args.enabled,suspended:false});try{engine.change(args.enabled);}catch(e){throw unverified(e);}}
    else if(!["status","health"].includes(action))throw Error("Unknown microphone action");
    return report();
  }
  return {run};
}
if(require.main===module)support.main(create);module.exports={create};
