import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import Catalogo from "../CATALOGO/catalogo"


const CarouselPage = () => {
  return (
    <div>
      <div>
      <MDBContainer>
      <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true} className="z-depth-1">
      <MDBCarouselInner>
        <MDBCarouselItem itemId="1">
          <MDBView>
            <img className="d-block w-100 " src="http://ecommerce-g5.tk/server-fotos/carrusel1.jpg" alt="First slide"/>
          <MDBMask overlay="black-light" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Acá vas a conseguir</h3>
            <p>Lo que no encontrás en ningún lado</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="2">
          <MDBView>
            <img className="d-block w-100" src="http://ecommerce-g5.tk/server-fotos/carrusel2.jpg" alt="Second slide"/>
          <MDBMask overlay="black-strong" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Desde una dimensión desconocida</h3>
            <p>Hasta tesoros preciados</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
        <MDBCarouselItem itemId="3">
          <MDBView>
            <img className="d-block w-100" src="http://ecommerce-g5.tk/server-fotos/carrusel3.jpg" alt="Third slide"/>
          <MDBMask overlay="black-slight" />
          </MDBView>
          <MDBCarouselCaption>
            <h3 className="h3-responsive">Y si no</h3>
            <p>Te lo conseguimos</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </MDBContainer>
      </div>
    <div>
      <Catalogo/>
      </div></div>
  );
}

export default CarouselPage;