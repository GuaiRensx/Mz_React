import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';

export class Banner extends Component {
    state = {
        data: [],
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: ['https://static.maizuo.com/v5/upload/5e1661599cd965986930e7d5e596be73.jpg',
                    'https://static.maizuo.com/v5/upload/458912a3c5e4f91d1f1878eabdbab256.jpg',
                    'https://static.maizuo.com/v5/upload/c3bb2c19e791a8cae43717a07c08f882.jpg',
                    'https://static.maizuo.com/v5/upload/275a8d4bce987d745aea1e07b397bcb8.jpg',
                    'https://static.maizuo.com/v5/upload/1c49807f8881d7fb7d75271b820085dc.jpg',
                    'https://static.maizuo.com/v5/upload/4d8988dcc9dd110584e90cafbb058ce6.jpg',
                    'https://static.maizuo.com/v5/upload/478f917b25402c3078dd0ba656243be8.jpg'
                ],
            });
        }, 100);
    }
    render() {
        return (
            <Carousel
                autoplay={true}
                infinite={true}
                autoplayInterval={2000}
            >
                {this.state.data.map(val => (
                    <a
                        key={val}
                        href=""
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                        <img
                            src={`${val}`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        );
    }
}