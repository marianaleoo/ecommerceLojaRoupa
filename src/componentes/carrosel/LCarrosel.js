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
            "",
        },
        {
          title: "",
          description: "",
          imgLink:
            "",
        },
        {
          title: "",
          description: "",
          imgLink:
            "",
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
              height: "300px",
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
