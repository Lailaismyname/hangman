window.addEventListener('load',()=>{
    
    class Hangman{
        constructor() {
            this.woordenlijst = ["absolute","abstract","academic","accepted","accident","accuracy","accurate","achieved","acquired","activity","actually","addition","adequate","adjacent","adjusted",
            "advanced","advisory","advocate","affected","aircraft","alliance","although","aluminum","analysis","announce","anything","anywhere","apparent","appendix","approach","approval","argument",
            "artistic","assembly","assuming","athletic","attached","attitude","attorney","audience","autonomy","aviation","bachelor","bacteria","baseball","bathroom","becoming","benjamin","birthday",
            "boundary","breaking","breeding","building","bulletin","business","calendar","campaign","capacity","casualty","catching","category","Catholic","cautious","cellular","ceremony","chairman",
            "champion","chemical","children","circular","civilian","clearing","clinical","clothing","collapse","colonial","colorful","commence","commerce","complain","complete","composed","compound",
            "comprise","computer","conclude","concrete","conflict","confused","congress","consider","constant","consumer","continue","contract","contrary","contrast","convince","corridor","coverage",
            "covering","creation","creative","criminal","critical","crossing","cultural","currency","customer","database","daughter","daylight","deadline","deciding","decision","decrease","deferred",
            "definite","delicate","delivery","describe","designer","detailed","diabetes","dialogue","diameter","directly","director","disabled","disaster","disclose","discount","discover","disorder",
            "disposal","distance","distinct","district","dividend","division","doctrine","document","domestic","dominant","dominate","doubtful","dramatic","dressing","dropping","duration","dynamics",
            "earnings","economic","educated","efficacy","eighteen","election","electric","eligible","emerging","emphasis","employee","endeavor","engaging","engineer","enormous","entirely","entrance",
            "envelope","equality","equation","estimate","evaluate","eventual","everyday","everyone","evidence","exchange","exciting","exercise","explicit","exposure","extended","external","facility",
            "familiar","featured","feedback","festival","finished","firewall","flagship","flexible","floating","football","foothill","forecast","foremost","formerly","fourteen","fraction","franklin",
            "frequent","friendly","frontier","function","generate","generous","genomics","goodwill","governor","graduate","graphics","grateful","guardian","guidance","handling","hardware","heritage",
            "highland","historic","homeless","homepage","hospital","humanity","identify","identity","ideology","imperial","incident","included","increase","indicate","indirect","industry","informal",
            "informed","inherent","initiate","innocent","inspired","instance","integral","intended","interact","interest","interior","internal","interval","intimate","intranet","invasion","involved",
            "isolated","judgment","judicial","junction","keyboard","landlord","language","laughter","learning","leverage","lifetime","lighting","likewise","limiting","literary","location","magazine",
            "magnetic","maintain","majority","marginal","marriage","material","maturity","maximize","meantime","measured","medicine","medieval","memorial","merchant","midnight","military","minimize",
            "minister","ministry","minority","mobility","modeling","moderate","momentum","monetary","moreover","mortgage","mountain","mounting","movement","multiple","national","negative","nineteen",
            "northern","notebook","numerous","observer","occasion","offering","official","offshore","operator","opponent","opposite","optimism","optional","ordinary","organize","original","overcome",
            "overhead","overseas","overview","painting","parallel","parental","patented","patience","peaceful","periodic","personal","persuade","petition","physical","pipeline","platform","pleasant",
            "pleasure","politics","portable","portrait","position","positive","possible","powerful","practice","precious","pregnant","presence","preserve","pressing","pressure","previous","princess",
            "printing","priority","probable","probably","producer","profound","progress","property","proposal","prospect","protocol","provided","provider","province","publicly","purchase","pursuant",
            "quantity","question","rational","reaction","received","receiver","recovery","regional","register","relation","relative","relevant","reliable","reliance","religion","remember","renowned",
            "repeated","reporter","republic","required","research","reserved","resident","resigned","resource","response","restrict","revision","rigorous","romantic","sampling","scenario","schedule",
            "scrutiny","seasonal","secondly","security","sensible","sentence","separate","sequence","sergeant","shipping","shortage","shoulder","simplify","situated","slightly","software","solution",
            "somebody","somewhat","southern","speaking","specific","spectrum","sporting","standard","standing","standout","sterling","straight","strategy","strength","striking","struggle","stunning",
            "suburban","suitable","superior","supposed","surgical","surprise","survival","sweeping","swimming","symbolic","sympathy","syndrome","tactical","tailored","takeover","tangible","taxation",
            "taxpayer","teaching","tendency","terminal","terrible","thinking","thirteen","thorough","thousand","together","tomorrow","touching","tracking","training","transfer","traveled","treasury",
            "triangle","tropical","turnover","ultimate","umbrella","universe","unlawful","unlikely","valuable","variable","vertical","victoria","violence","volatile","warranty","weakness","weighted",
            "whatever","whenever","wherever","wildlife","wireless","withdraw","woodland","workshop","yourself"];
            this.score = 0; 
            this.word;
            this.gameBox = document.getElementById('gameBox');
            this.wordBox = document.getElementById('wordBox');
            this.attempts = 0;
            this.guessed = 0;
        }
        //methods
        start(){
            //dit word de startfunctie
            this.shuffleArray(this.woordenlijst);
            this.renderGame();
            this.clickHandler();
        }
        shuffleArray(array){
                array.sort(function () {
                    return Math.random() - 0.5;
                });
        }
        renderGame(){
            const keyboardKeys = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
            this.word = this.woordenlijst[this.score].toString();
            const img = `<img id="hangman-img" src="img/game/afbeelding${this.attempts}.png" alt="hangman">`;
            const keyboard = '<div id="keyboard"></div>';
            this.gameBox.innerHTML = img + '<div id="word"></div>';
            for(let i = 0; i < this.word.length; i++){
            document.getElementById('word').innerHTML += `<p id=${i}>-</p>`;
            }
            this.gameBox.innerHTML += keyboard ;


            let keyboardBox = document.getElementById('keyboard');
            for(let i = 0; i < 30; i++){
                if (i < 10){
                    const keyboardTopRow = `<button id="${keyboardKeys[i]}" class="key-btn keyboard-top-row">${keyboardKeys[i]}</button>`;
                    keyboardBox.innerHTML += keyboardTopRow;
                }
                else if(i >= 10 && i <= 20){
                    const keyboardMiddleRow = `<button id="${keyboardKeys[i]}" class="key-btn keyboard-middle-row">${keyboardKeys[i]}</button>`;
                    keyboardBox.innerHTML += keyboardMiddleRow;
                }
                else if( i >= 20 && i < 26){
                    const keyboardBottomRow = `<button id="${keyboardKeys[i]}" class="key-btn keyboard-bottom-row">${keyboardKeys[i]}</button>`;
                    keyboardBox.innerHTML += keyboardBottomRow;
                }
            }
        }
        printWinScreen(){
            this.attempts = 0;
            this.guessed = 0;
            //print win box
            this.gameBox.innerHTML = '<p class="win-lose-msg">You Win!</p><button id="winBtn" class="newGame">New Game</button>';
        }
        printLoseScreen(){
            this.attempts = 0;
            this.guessed = 0;
            this.gameBox.innerHTML = '<p class="win-lose-msg">You Lose!</p> <img src="img/game/afbeelding10.png" alt="hangman"><button id="loseBtn" class="newGame">New Game</button>';
        }
        clickHandler(){
            this.gameBox.addEventListener('click', (e)=>{
                //hier wat er gebeurt als er op een letter knop word gedrukt
                if(e.target.classList.contains('key-btn')){
                    //als letter in het woord voor komt: 
                    if(this.word.indexOf((e.target.id)) >= 0){
                        this.guessed++;
                        let pos = this.word.indexOf((e.target.id));
                        document.getElementById(pos).textContent = e.target.id;
                        if(pos < this.word.length){
                            if(this.word.indexOf((e.target.id),pos+1) > 0){
                                let pos2 = this.word.indexOf((e.target.id),pos + 1);
                                this.guessed++;
                                document.getElementById(pos2).textContent = e.target.id;
                            }
                        }
                        e.target.style.pointerEvents = 'none';
                        e.target.style.color = '#75B9BE';
                        //winst:
                        if(this.word.length == this.guessed){
                            this.printWinScreen();
                        }
                    }
                    else if(this.word.indexOf((e.target.id)) == -1){
                        //als letter niet in het woord voorkomt:
                        this.attempts++;
                        document.getElementById('hangman-img').src = `img/game/afbeelding${this.attempts}.png`;
                        e.target.style.color = '#75B9BE';
                        e.target.style.pointerEvents = 'none';
                        if(this.attempts == 10){
                            this.printLoseScreen();
                        }
                    }
                }
                //start nieuwe game. 
                if(e.target.classList.contains('newGame')){
                    this.score++;
                    this.renderGame();
                }
            })
        }

      }
      //hier aanroep voor game
      let hangmanGame = new Hangman();
      hangmanGame.start();
    });