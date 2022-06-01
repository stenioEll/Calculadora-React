import React, { Component } from "react";
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0', //inicio
    clearDisplay: false,// se vai precisar limpar
    operation: null,
    values:[0,0],
    current: 0 //qual valor to digitando 0 ou 1
}

export default class Calculator extends Component {

    state = { ...initialState} //startar o estado usando spread, clonando ele

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }    
    clearMemory() {
        this.setState({ ...initialState}) //voltando para o estado inicial
    }

    setOperation(operation) { //operação escolhida
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            switch (currentOperation) {
                case "/":
                    values[0] /= values[1];
                    values[0] = parseFloat(values[0].toFixed(3))
                    break;
                case "*":
                    values[0] *= values[1];
                    break;
                case "+":
                    values[0] += values[1];
                    break;
                case "-":
                    values[0] -= values[1];
                    break;
                default:
            }

            values[1] = 0

            this.setState({
                displayValue: values[0].toString(),
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })

        }
    }
    addDigit(n) {
        if(n === '.' && this.state.displayValue.includes('.')) { // se ja tiver ponto n pode adicionar outro
            return // saia e n faça mais nada 
        }

        const clearDisplay = this.state.displayValue === '0' // limpa para caso digita 1 ou outro numero ai o estado muda ou quando o limpa for clicado
            || this.state.clearDisplay // se clear display ta true entao é verdadeira
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay:false})
        

        if(n !== '.') {
            const i = this.state.current // escolhendo indice do array
            const newValue = parseFloat(displayValue) 
            const values = [...this.state.values] //clonei array
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }


    render () {
        const addDigit = n => this.addDigit()
        const setOperation = op => this.setOperation()
        return (
            <div className="calculator">
               <Display value={this.state.displayValue} /> 
               <Button label="AC" click = {() => this.clearMemory()} triple/>
               <Button label="/" click = {this.setOperation} operation />
               <Button label="7" click={this.addDigit}/>
               <Button label="8" click={this.addDigit}/>
               <Button label="9" click={this.addDigit}/>
               <Button label="*" click={this.setOperation} operation/>
               <Button label="4" click={this.addDigit}/>
               <Button label="5" click={this.addDigit}/>
               <Button label="6" click={this.addDigit}/>
               <Button label="-" click={this.setOperation} operation />
               <Button label="1" click={this.addDigit}/>
               <Button label="2" click={this.addDigit}/>
               <Button label="3" click={this.addDigit}/>
               <Button label="+" click={this.setOperation} operation/>
               <Button label="0" click={this.addDigit} double />
               <Button label="." click={this.addDigit}/>
               <Button label="=" click={this.setOperation} operation/>

            </div>
        )
    }
}