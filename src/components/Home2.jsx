import React from 'react'
import Footer from './Footer'
import Carousel from './Carousel'
import ScrollToTop from './ScrollToTop'

export default function Home2() {
    return (
        <>
            <div className="container_home2">
                <Carousel />
                <Footer />
                <ScrollToTop />
            </div>
        </>
    )
}
