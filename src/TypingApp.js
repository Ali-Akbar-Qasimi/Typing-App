import React from 'react'

export default function TypingApp() {


    //console.log(window.navigator.geolocation)


    const API_URL = 'https://api.quotable.io/random'
    const [nextQuote, setNextQuote] = React.useState(false)
    const [quote, setQuote] = React.useState('')
    React.useEffect(() => {
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            setQuote(() =>{
                let text = data.content
                let splittedText = text.split('')
                let spanElements = splittedText.map((letter,index) => {
                    return(
                        <span key={index}>{letter}</span>
                        )
                    })
                    return(
                        <>
                         {spanElements}
                    </>
                )
            })
            
        })
    },[nextQuote])
    let text = document.querySelector('.text')
    let input = document.querySelector('.input')
    function handleChange(){
        let inputValue = input.value.split('')
        let quoteValue = text.querySelectorAll('span')
        let correct = true

        quoteValue.forEach((characterSpan,index) => {
            let character = inputValue[index]

            if(character == null){
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
                correct = false
            }else if(character === characterSpan.innerHTML){
                characterSpan.classList.add('correct')
                characterSpan.classList.remove('incorrect')

            }else{
                characterSpan.classList.add('incorrect')
                characterSpan.classList.remove('correct')
                correct = false
            }

        })
        if (correct){
            setNextQuote(prevNextQuote => !prevNextQuote)
            input.value = null
            quoteValue.forEach(characterSpan => {
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
            })
        }
    }


    
    return (
        <div>
            <h1 className='header'>Typing App</h1>
            <div className='container'>
                <div className='text'>{quote}</div>
                <textarea onChange={handleChange} className='input'></textarea>
            </div>
        </div>
    )
}