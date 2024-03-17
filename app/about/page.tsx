
"use client"
import React, { Component } from 'react'; 
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'; 
  
export default class NextJsCarousel extends Component { 
    render() { 
        return ( 
            <div> 
              <h2>NextJs Carousel - GeeksforGeeks</h2> 
              <Carousel> 
                  <div> 
                      <img src="/1.png" alt="image1"/> 
                    
  
                  </div> 
                  <div> 
                      <img src="/2.png" alt="image2" /> 
               
  
                  </div> 
                  <div> 
                      <img src="/3.png" alt="image3"/> 
                    
  
                  </div> 
              </Carousel> 
            </div> 
        ); 
    } 
};