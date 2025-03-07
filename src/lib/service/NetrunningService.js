import { MODULE_ID, NETRUNNING } from "../Constants";

function toggleJackEffect(token) {
    let netrunningEffect = Sequencer.EffectManager.getEffects({object: token, name: NETRUNNING });
    if(netrunningEffect.length)
        Sequencer.EffectManager.endEffects({object: token, name: NETRUNNING })
     else 
        new Sequence()
                .effect()
                .playbackRate(0.3)
                .opacity(0.5)
                .fadeIn(100)
                .attachTo(token)
                .file(`modules/${MODULE_ID}/assets/animations/netrunning.webm`)
                .scaleToObject(1.3)
                .fadeOut(100)
                .name(NETRUNNING)
                .persist()
                .play()
}

export {
    toggleJackEffect
}