import Faq from "react-faq-component";
import aboutPlus from "assets/aboutPlus.png"

const data = {
    rows: [
        {
            title: "What happens when cards have the same attack and defense points?",
            content: "Cards with the same attack and defense points will cancel each other out, with no damage dealt to either player."
        },
        {
            title: "How is damage calculated when a player attacks?",
            content: "The attacking card’s attack points will deduct from the opposing player’s health points, affecting their total health."
        },
        {
            title: "What happens if a player doesn’t defend?",
            content: "If Player 1 does not defend, their health will be reduced by Player 2’s attack points."
        },
        {
            title: "How does defense work against an attack?",
            content: "If a player defends, the damage they receive equals the opponent's attack points minus their own defense points."
        },
        {
            title: "How does defending impact a player’s Mana?",
            content: "Defending replenishes 3 Mana points for the defending player."
        },
        {
            title: "How does attacking affect a player’s Mana?",
            content: "Each attack costs the player 3 Mana points."
        },
        {
            title: "How does a player win the game?",
            content: "The game is won when one player successfully reduces the opposing player’s health points to zero."
        },
        {
            title: "Are there any limits to the number of defenses a player can make?",
            content: "Players can defend as long as they have enough Mana, allowing for strategic defensive plays."
        }
    ]
};

const styles = {
    bgColor: "transparent",       
    rowTitleColor: "#FFFFFF",      
    rowContentColor: "#B3B3B3",    
    arrowColor: "#FFD700",  
    rowContentPaddingLeft: "13",
};

const config = {
    animate: true,
    tabFocus: true,
};

const Faqs = () => {

    return (
        <div id="faqs" className='!font-rajdhani relative overflow-hidden flex items-center flex-col gap-[1rem] sm:gap-[2rem] w-full py-[1rem] bg-grey10 '>
            <div className='relative flex items-center font-medium text-[1.7rem] md:text-[3.125rem] justify-center w-[60%] max-w-[412px] h-[3.5rem] md:h-[5.375rem] gap-[1rem] sm:gap-[2rem] text-gold10  rounded-xl overflow-hidden'>
                <div className='w-[2.5rem] animate-wiggle'>
                    <img
                        className="size-full"
                        src={aboutPlus}
                        alt="plusIcon"
                    />
                </div>
                <h1>FAQ</h1>
            </div>
            <div className="w-[80%] !text-[2rem]">
                <Faq
                    data={data}
                    styles={styles}
                    config={config}
                />
            </div>
        </div>
    )
}

export default Faqs ;