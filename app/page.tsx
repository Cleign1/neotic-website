
export default function Home() {
  const sections = [
    {
      title: "Our Latest Program",
      imageSrc: "/path/to/program-image.png",
      description: "Description for the latest program.",
    },
    {
      title: "Our Latest News",
      imageSrc: "/path/to/news-image.png",
      description: "Description for the latest news.",
    },
    // Add more sections as needed
  ];
  
  return (
    <div className="min-h-screen">
      <div className="container justify-center py-10 flex items-center"> 
        <div className="bg-white">
          <p className="text-black font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae minus ex temporibus illum unde sed quos nihil expedita, neque quidem omnis facilis excepturi assumenda laboriosam magnam ea quas aspernatur sapiente, molestias, laudantium consequuntur. Sint numquam dignissimos voluptate tempore nam in accusantium veritatis doloremque inventore. Ducimus maiores dolore doloribus nihil, rerum quis recusandae facilis velit pariatur possimus, natus nesciunt consectetur atque error alias itaque perspiciatis et quaerat laboriosam est cumque ipsam quibusdam placeat! Blanditiis voluptatem, quidem exercitationem officia, a quis culpa et ipsum consequuntur possimus nemo ducimus laboriosam reprehenderit minima, unde aliquid perferendis dolore rerum harum! Laudantium illum delectus ullam?
          </p>
        </div>
      </div>
    </div>
  );
}
