//api example data for lamp products in store

export const lampCategories = [
  "Table Lamps",
  "Floor Lamps",
  "Pendant Lights",
  "Wall Sconces",
  "Chandeliers",
  "Desk Lamps",
  "Modern",
  "Vintage",
  "Industrial",
];

export const lampProducts = [
  {
    id: 1,
    name: "Modern Table Lamp",
    price: 129.99,
    categories: ["Table Lamps", "Modern"],
    image: "/images/products/lamp1-a.png",
    other_images: [
      "/images/products/lamp1-b.jpeg",
      "/images/products/lamp1-c.png",
      "/images/products/lamp1-d.jpeg",
    ],
    description:
      "Illuminate your workspace with this sleek and elegant Modern Table Lamp, designed to blend seamlessly into any contemporary setting.",
  },
  {
    id: 2,
    name: "Vintage Floor Lamp",
    price: 199.99,
    categories: ["Floor Lamps", "Vintage"],
    image: "/images/products/lamp2-a.jpeg",
    other_images: [
      "/images/products/lamp2-b.jpeg",
      "/images/products/lamp2-c.jpeg",
    ],
    description:
      "Add a touch of timeless charm to your living space with this Vintage Floor Lamp, featuring intricate details and a classic design.",
  },
  {
    id: 3,
    name: "Industrial Desk Light",
    price: 89.99,
    categories: ["Desk Lamps", "Industrial"],
    image: "/images/products/lamp3-a.jpeg",
    other_images: [
      "/images/products/lamp3-b.jpeg",
      "/images/products/lamp3-c.jpeg",
    ],
    description:
      "Combine functionality and style with this Industrial Desk Light, perfect for modern offices and study areas.",
  },
  {
    id: 4,
    name: "Art Deco Sconce",
    price: 149.99,
    categories: ["Wall Sconces", "Vintage"],
    image: "/images/products/lamp4-a.jpeg",
    other_images: [
      "/images/products/lamp4-b.jpeg",
      "/images/products/lamp4-c.jpeg",
    ],
    description:
      "Enhance your walls with the luxurious glow of this Art Deco Sconce, a statement piece for sophisticated interiors.",
  },
  {
    id: 5,
    name: "Crystal Chandelier",
    price: 599.99,
    categories: ["Chandeliers", "Vintage"],
    onSale: true,
    salePrice: 449.99,
    image: "/images/products/lamp5-a.jpeg",
    other_images: [
      "/images/products/lamp5-b.jpeg",
      "/images/products/lamp5-c.jpeg",
      "/images/products/lamp5-d.jpeg",
    ],
    description:
      "Transform your home into a palace of light with this stunning Crystal Chandelier, designed to captivate and impress.",
  },
  {
    id: 6,
    name: "Minimalist Pendant Light",
    price: 179.99,
    categories: ["Pendant Lights", "Modern"],
    image: "/images/products/lamp6-a.jpeg",
    other_images: [
      "/images/products/lamp6-b.jpeg",
      "/images/products/lamp6-c.jpeg",
      "/images/products/lamp6-d.jpeg",
    ],
    description:
      "Simplicity meets elegance with this Minimalist Pendant Light, perfect for kitchens, dining areas, or open spaces.",
  },
  {
    id: 7,
    name: "Bamboo Table Lamp",
    price: 119.99,
    categories: ["Table Lamps", "Modern"],
    image: "/images/products/lamp7-a.png",
    other_images: [
      "/images/products/lamp7-b.jpeg",
      "/images/products/lamp7-c.png",
      "/images/products/lamp7-d.png",
    ],
    description:
      "Bring nature indoors with this eco-friendly Bamboo Table Lamp, offering a warm and calming ambiance.",
  },
  {
    id: 8,
    name: "Nordic Floor Light",
    price: 229.99,
    categories: ["Floor Lamps", "Modern"],
    image: "/images/products/lamp8-a.jpeg",
    other_images: ["/images/products/lamp8-b.jpeg"],
    description:
      "Create a cozy and inviting space with this Nordic Floor Light, inspired by Scandinavian design principles.",
  },
  {
    id: 9,
    name: "Brass Reading Lamp",
    price: 159.99,
    categories: ["Table Lamps", "Vintage"],
    image: "/images/products/lamp9-a.jpeg",
    other_images: ["/images/products/lamp9-b.jpeg"],
    description:
      "Read in style with this vintage-inspired Brass Reading Lamp, combining classic aesthetics with modern functionality.",
  },
  {
    id: 10,
    name: "Luxury Crystal Table Lamp",
    price: 399.99,
    categories: ["Table Lamps", "Vintage"],
    onSale: true,
    salePrice: 299.99,
    image: "/images/products/lamp10-a.jpeg",
    other_images: [
      "/images/products/lamp10-b.jpeg",
      "/images/products/lamp10-c.jpeg",
    ],
    description:
      "Elevate your decor with this Luxury Crystal Table Lamp, a timeless piece that radiates sophistication.",
  },
  {
    id: 11,
    name: "Rustic Wall Sconce",
    price: 89.99,
    categories: ["Wall Sconces", "Industrial"],
    image: "/images/products/lamp11-a.jpeg",
    other_images: [],
    description:
      "Add rustic charm to your walls with this handcrafted Wall Sconce, ideal for cozy cabins or farmhouse-inspired spaces.",
  },
  {
    id: 12,
    name: "Contemporary Desk Lamp",
    price: 139.99,
    categories: ["Desk Lamps", "Modern"],
    image: "/images/products/lamp12-b.jpeg",
    other_images: ["/images/products/lamp12-c.jpeg"],
    description:
      "Light up your desk with this sleek Contemporary Desk Lamp, designed to provide optimal lighting for any task.",
  },
  {
    id: 13,
    name: "Japanese Paper Lantern",
    price: 69.99,
    categories: ["Pendant Lights", "Modern"],
    image: "/images/products/lamp13-a.jpeg",
    other_images: [
      "/images/products/lamp13-b.jpeg",
      "/images/products/lamp13-c.jpeg",
    ],
    description:
      "Embrace serenity with this Japanese Paper Lantern, featuring a soft, diffused light that creates a tranquil atmosphere.",
  },
  {
    id: 14,
    name: "Mid-Century Table Light",
    price: 189.99,
    categories: ["Table Lamps", "Vintage"],
    image: "/images/products/lamp14-a.jpeg",
    other_images: [
      "/images/products/lamp14-b.jpeg",
      "/images/products/lamp14-c.jpeg",
    ],
    description:
      "A timeless design for modern homes, this Mid-Century Table Light exudes elegance and simplicity.",
  },
  {
    id: 15,
    name: "Bohemian Hanging Lamp",
    price: 249.99,
    categories: ["Pendant Lights", "Vintage"],
    onSale: true,
    salePrice: 199.99,
    image: "/images/products/lamp15-a.jpeg",
    other_images: [
      "/images/products/lamp15-b.jpeg",
      "/images/products/lamp15-c.jpeg",
    ],
    description:
      "Add a touch of boho flair to your home with this intricately designed Bohemian Hanging Lamp.",
  },
  {
    id: 16,
    name: "Glass Globe Pendant",
    price: 159.99,
    categories: ["Pendant Lights", "Modern"],
    image: "/images/products/lamp16-a.jpeg",
    other_images: ["/images/products/lamp16-b.jpeg"],
    description:
      "Illuminate your space with elegance and charm with this Glass Globe Pendant, perfect for modern interiors.",
  },
  {
    id: 17,
    name: "Copper Floor Lamp",
    price: 279.99,
    categories: ["Floor Lamps", "Industrial"],
    image: "/images/products/lamp17-a.jpeg",
    other_images: [
      "/images/products/lamp17-b.jpeg",
      "/images/products/lamp17-c.jpeg",
      "/images/products/lamp17-d.jpeg",
    ],
    description:
      "Add a warm glow to your home with this Copper Floor Lamp, featuring a striking yet subtle design.",
  },
  {
    id: 18,
    name: "Geometric Table Light",
    price: 129.99,
    categories: ["Table Lamps", "Modern"],
    image: "/images/products/lamp18-a.jpeg",
    other_images: [
      "/images/products/lamp18-b.jpeg",
      "/images/products/lamp18-c.jpeg",
      "/images/products/lamp18-d.jpeg",
    ],
    description:
      "Bring modern sophistication to your home with the Geometric Table Light. Featuring clean lines and an intriguing shape, this lamp is perfect for adding visual interest and style to any table, whether in the living room or office.",
  },
  {
    id: 19,
    name: "Marble Base Lamp",
    price: 219.99,
    categories: ["Table Lamps", "Modern"],
    image: "/images/products/lamp19-a.jpeg",
    other_images: [
      "/images/products/lamp19-b.jpeg",
      "/images/products/lamp19-c.jpeg",
    ],
    description:
      "A combination of timeless elegance and contemporary style, this Marble Base Lamp features a sleek marble pedestal that exudes luxury. Its soft lighting creates a cozy atmosphere, making it perfect for living rooms, bedrooms, or hallways.",
  },
  {
    id: 20,
    name: "Art Nouveau Chandelier",
    price: 699.99,
    categories: ["Chandeliers", "Vintage"],
    onSale: true,
    salePrice: 549.99,
    image: "/images/products/lamp20-a.png",
    other_images: [
      "/images/products/lamp20-b.jpeg",
      "/images/products/lamp20-c.png",
      "/images/products/lamp20-d.png",
    ],
    description:
      "Elevate your space with the intricate details and elegance of the Art Nouveau Chandelier. Inspired by the flowing curves and natural forms of the Art Nouveau movement, this chandelier is a masterpiece that brings both light and luxury to your home.",
  },
];

export const articles = [
  {
    article_id: "1",
    article_title: "Light is ",
    article_emphasis: "Powerful",
    article_image: "/images/products/article1.webp",
    description:
      "Lighting is one of the most powerful elements in interior design. It has the ability to completely transform a space, setting the mood, highlighting features, and enhancing the overall aesthetic. When it comes to luxury living, quality lighting is essential in creating an atmosphere of elegance and sophistication. Quality lighting not only serves a functional purpose but also acts as an accent that elevates the beauty of your home. A well-lit room can make your interiors feel more spacious, while the right lighting fixtures can add a touch of opulence. Whether it's the soft glow from a Tiffany-style table lamp or the dramatic effect of an antique brass chandelier, lighting can act as a focal point, commanding attention while blending seamlessly with the décor. In a luxury space, lighting is more than just a necessity—it's a statement. From chic chandeliers to modern LED floor lamps, the style and design of your light fixtures can reflect your personal taste and enhance the luxurious feel of your space. The elegance of a crystal wall sconce or the contemporary edge of a geometric pendant light not only illuminates the room but also elevates the aesthetic value, providing a sense of grandeur. Investing in high-quality lighting can also significantly enhance the functionality of your living space. Adjustable lamps provide practical lighting for reading or working, while ambient lighting sets a relaxing mood for unwinding after a long day. Proper lighting can also highlight the architectural details of your home, drawing attention to fine textures, beautiful artwork, or carefully chosen furniture pieces. Ultimately, quality lighting is an essential component in creating a luxury home that feels both welcoming and exquisite. It's a subtle but impactful way to express your style and enhance the overall ambiance of your living environment.",
  },
  {
    article_id: "2",
    article_title: "The Light is much more than just a source of ",
    article_emphasis: "Illumination",
    article_image: "/images/products/article2.jpeg",
    description:
      "Lighting is much more than just a source of illumination—it plays a crucial role in defining the mood, atmosphere, and aesthetic of a room. In luxury interiors, lighting is a key element that brings the space to life, turning ordinary rooms into stunning showcases of design and sophistication. The right lighting fixtures can make a significant difference in how a room feels. A beautifully designed pendant light can serve as a statement piece, drawing attention and enhancing the overall luxury feel of a space. Whether it's a glass globe pendant, a modern LED floor lamp, or an opulent chandelier, luxury lighting creates an aura of elegance and refinement that can't be achieved with standard fixtures. Moreover, the luxury lighting industry focuses not only on style but also on the craftsmanship and materials used. High-quality lighting pieces, such as those with intricate crystal designs or unique metal finishes, add an unparalleled level of sophistication to your space. These elements speak volumes about your attention to detail and appreciation for the finer things in life. Properly positioned lighting can also bring out the best in your furniture and décor. For example, the warm glow from a well-placed table lamp can enhance the textures and colors of luxury fabrics, while soft lighting from a chandelier can create dramatic shadows that highlight architectural features. With the right lighting, even the simplest of rooms can feel luxurious and inviting. When designing a luxury space, never underestimate the power of lighting. It is a fundamental aspect that can tie together all other design elements and provide a cohesive, stylish look. From chandeliers that command attention to soft, ambient lighting that creates a relaxed atmosphere, lighting helps define the luxury experience in your home.",
  },
  {
    article_id: "3",
    article_title: "Details which bring ",
    article_emphasis: "Luxury",
    article_image: "/images/products/article3.jpeg",
    description:
      "In luxury home design, every detail matters. One element that plays a crucial role in elevating the aesthetic and ambiance of your living space is lighting. From intricate chandeliers to sleek, modern lamps, high-end lighting pieces are not just functional; they are works of art that reflect your personal taste and sophistication. Quality lighting has the power to make or break the mood of a room. Well-chosen light fixtures can add layers of warmth, depth, and visual interest. Think about the dramatic effect of a crystal chandelier hanging in a grand entryway, or the soft, inviting light from a designer floor lamp casting a glow over a cozy seating area. In luxury spaces, lighting is a tool for creating an atmosphere that feels both inviting and elevated. A luxury home demands lighting that complements its design elements, enhances its features, and creates a sense of refinement. Lighting pieces, such as marble base lamps or Scandinavian table lamps, should be thoughtfully selected to complement the room's décor and elevate its visual appeal. The right lighting choice can turn an ordinary room into an extraordinary experience. Luxury lighting also adds an element of exclusivity. High-end fixtures crafted from premium materials such as crystal, brass, or glass offer a level of craftsmanship that reflects your discerning taste. These lighting fixtures not only illuminate your space but also act as showpieces, becoming focal points that contribute to the room's overall luxury feel. Whether it's providing soft ambient lighting for relaxation, task lighting for functionality, or accent lighting to highlight your favorite features, the right lighting enhances the luxury experience in every corner of your home. In the world of high-end design, quality lighting is a must-have to create a space that feels as luxurious as it looks.",
  },
];
