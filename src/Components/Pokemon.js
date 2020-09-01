import React, { Component } from 'react'
import Card from "./Card"

export default class Pokemon extends Component {
    render() {
        return (
            <div>
                <h1>LIstado de pokemones</h1>
                <Card/>
            </div>
        )
    }
}
