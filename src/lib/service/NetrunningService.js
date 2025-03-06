const EFFECT_NAME = "Netrunning";

function toggleJackEffect(token) {
    let netrunningEffect = Sequencer.EffectManager.getEffects({object: token, name: EFFECT_NAME });
    if(netrunningEffect.length)
        Sequencer.EffectManager.endEffects({object: token, name: EFFECT_NAME })
     else 
        new Sequence()
                .effect()
                .playbackRate(0.3)
                .opacity(0.5)
                .fadeIn(100)
                .attachTo(token)
                .file("modules/acorip/assets/animations/netrunning.webm")
                .scaleToObject(1.3)
                .fadeOut(100)
                .name(EFFECT_NAME)
                .persist()
                .play()
}

export {
    toggleJackEffect
}