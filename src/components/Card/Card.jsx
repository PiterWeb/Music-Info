import Link from '../Link/Link'
import './Card.css'

function Card (props) {

    const {cardTitle, cardArtists, cardImage, cardLink} = props

    return (
        <article className="card">
            <header className="cardImage">
                <img src={cardImage} className="cardImage" alt=""/>
            </header>
            <main className="cardInfo">
                <h6 id="cardTitle">{cardTitle}</h6>
                <h6 id="cardArtists">{cardArtists.map(artist => artist.name).reduce((all , artist) => all + ", "+ artist)}</h6>
            </main>
            <footer className="cardMore">
                <Link to={`/song/${cardLink}`} variant={'white'}>More</Link>
            </footer>
        </article>
    )

}

export default Card;