interface ActorHandler {
    
    getId(): string;

    isBlackICE(): boolean;
    isNetrunner(): boolean;
    isSolo(): boolean;
    isLawman(): boolean;
    isMedtech(): boolean;
    isTech(): boolean;
    isFixer(): boolean;
    isMedia(): boolean;
    
}