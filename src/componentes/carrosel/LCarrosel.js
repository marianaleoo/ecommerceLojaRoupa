import { Component } from "react";
import { Carousel } from "react-bootstrap";

export default class LCarrosel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          title: "",
          description: "",
          imgLink:
            "https://conceitoprisma.com.br/wp-content/uploads/2019/09/roupa-conceito-prisma.jpg",
        },
        {
          title: "",
          description: "",
          imgLink:
            "https://thumbs.web.sapo.io/?W=800&H=0&png=1&delay_optim=1&epic=MmZkmb3leen49dwBB+6xGelXHS7icaMvOkd8e6+2QsSglqQKJaWJuQarEL1eYwQ6oSAkGiDf7cZZCnIem+uewp12W1SSO+3M2+fMhR+oqNqZZ7w=",
        },
      ],
    };
  }

  render() {
    const { items } = this.state;
    const carrouselItems = items.map((item, i) => {
      return (
        <Carousel.Item interval={5000}>
          <img
            style={{
              filter: "brightness(50%)",
              width: "800px",
              height: "500px",
              objectFit: "cover",
            }}
            className="d-block w-100"
            src={item.imgLink}
            alt={`${i} Slide`}
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

    return <Carousel {...this.props}>{carrouselItems}</Carousel>;
  }
}
