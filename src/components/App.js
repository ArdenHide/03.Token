import React, { Component } from 'react';
import Web3 from 'web3'
import Color from '../abis/Color.json'
import './App.css';
import Preloader from './Shared/Preloader';
import Navbar from './Navbar/Navbar';
import { MDBBtn } from 'mdb-react-ui-kit';

class App extends Component {
    state = {
        account: '',
        contract: null,
        totalSupply: 0,
        colors: []
    }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

        const networkId = await web3.eth.net.getId()
        const networkData = Color.networks[networkId]
        if (networkData) {
            const abi = Color.abi
            const address = networkData.address
            const contract = new web3.eth.Contract(abi, address)
            this.setState({ contract })
            const totalSupply = await contract.methods.totalSupply().call()
            this.setState({ totalSupply })
            // Load Colors
            for (var i = 1; i <= totalSupply; i++) {
                const color = await contract.methods.colors(i - 1).call()
                this.setState({
                    colors: [...this.state.colors, color]
                })
            }
        } else {
            window.alert('Smart contract not deployed to detected network.')
        }
    }

    mint = (color) => {
        this.state.contract.methods.mint(color).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.setState({
                    colors: [...this.state.colors, color]
                })
            })
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Navbar account={this.state.account} />
                <div className="wrapper">
                    <main role="main" className="h-100">
                        <div className="bg-dark py-2 mb-4">
                            <div className="container text-white">
                                <h1 className="fs-1 m-0">Issue Token</h1>
                            </div>
                        </div>
                        <div className="container mb-4">
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const color = this.color.value
                                this.mint(color)
                            }}>
                                <div className="form-outline mb-4">
                                    <input
                                        type='text'
                                        className='form-control mb-1'
                                        placeholder='e.g. #262626'
                                        ref={(input) => { this.color = input }}
                                    />
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4">
                                    <MDBBtn>Mint</MDBBtn>
                                </div>
                            </form>
                        </div>

                        <div className="bg-dark py-2 mb-4">
                            <div className="container text-white">
                                <h1 className="fs-1 m-0">Tokens</h1>
                            </div>
                        </div>
                        <div className="row text-center">
                            {this.state.colors.map((color, key) => {
                                return (
                                    <div key={key} className="col-md-3 mb-3">
                                        <div className="token" style={{ backgroundColor: color }}></div>
                                        <div>{color}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </main>
                </div>
            </>
        );
    }
}

export default App;
