
import { createElement, Component } from './framework'

class Carousel extends Component {
    constructor() {
        super();
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel');
        if (this.attributes.src) {
            for (let imgUrl of this.attributes.src) {
                let child = document.createElement('div');
                child.style.backgroundImage = `url('${imgUrl}')`;
                this.root.appendChild(child);
            }
        }

        let position = 0
        this.root.addEventListener("mousedown", (event) => {
            let children = this.root.children
            let startX = event.clientX
            let move = (event) => {
                let x = event.clientX - startX
                let current = position - (x - (x % 500)) / 500
                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset
                    pos = (pos + children.length) % children.length
                    children[pos].style.transition = "none"
                    children[pos].style.transform = `translateX(${-pos * 500 +
                        offset * 500 +
                        (x % 500)}px)`
                }
            }
            let up = (event) => {
                let x = event.clientX - startX
                position = position - Math.round(x / 500)
                for (let offset of [
                    0,
                    -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x)),
                ]) {
                    let pos = position + offset

                    pos = (pos + children.length) % children.length
                    children[pos].style.transition = ""
                    children[pos].style.transform = `translateX(${-pos * 500 +
                        offset * 500}px)`
                }
                document.removeEventListener("mousemove", move)
                document.removeEventListener("mouseup", up)
            }
            document.addEventListener("mousemove", move)

            document.addEventListener("mouseup", up)
        })

        // let currentIndex = 0
        // setInterval(() => {
        //     let children = this.root.children
        //     let nextIndex = (currentIndex + 1) % children.length
        //     let current = children[currentIndex]
        //     let next = children[nextIndex]
        //     next.style.transition = "none"
        //     next.style.transform = `translateX(${100 - nextIndex * 100}%)`
        //     setTimeout(() => {
        //         next.style.transition = ""
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        //         next.style.transform = `translateX(${-nextIndex * 100}%)`
        //         currentIndex = nextIndex
        //     }, 16)
        // }, 1000)

        return this.root;
    }

    mountTo(parent) {
        parent.appendChild(this.render());
    }

}

let d = ['https://static001.geekbang.org/resource/image/40/b1/40da5d89c59262711beaa206c48e67b1.jpg',
    'https://static001.geekbang.org/resource/image/50/fe/5022c19ab75d3b0215a276167a69b2fe.jpg',
    'https://static001.geekbang.org/resource/image/a6/f1/a691e6b628ceb9d7c2ca9780126301f1.jpg',
    'https://static001.geekbang.org/resource/image/ee/1c/ee5415f97405929ec61a586991e2111c.jpg',];
let a = (
    <Carousel src={d} />
);

a.mountTo(document.body)