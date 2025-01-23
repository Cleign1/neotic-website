export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-flow-row auto-rows-max mt-10 mb-10 gap-10">
        <div className="bg-blue-210 text-center font-semibold text-2xl p-4">
          <h1>Tentang Kami </h1>
        </div>
        <div className="bg-blue-210 py-8">
          <div className="container mx-auto m-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-4 rounded-lg hover:shadow-lg"> 
                <h1 className="text-center p-5 text-2xl font-semibold">Box 1 Title</h1>
                <p className="m-10 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eveniet est perferendis laborum ratione blanditiis fuga ipsam, numquam cumque vel mollitia debitis corrupti eos minima voluptates animi dolorem aspernatur minus, ullam suscipit? Magnam sed eveniet possimus dolor tempora distinctio ipsam quo ea modi. Perspiciatis facilis autem obcaecati consequatur! Quaerat architecto non consequuntur illo ipsam consequatur quisquam consectetur libero earum eveniet harum nulla provident nesciunt, autem odit voluptatum aut, nam adipisci esse neque dicta repellat, aperiam incidunt! Vero, quae molestiae dolorum ducimus ratione ipsam numquam commodi, sapiente praesentium cum omnis odio quibusdam fuga corrupti suscipit quo harum dignissimos blanditiis quod repudiandae.</p>
              </div>
              <div className="grid grid-row-2 gap-10">
                <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                  <h1 className="text-center text-2xl font semibold p-4 font-semibold">Box 2 Title</h1>
                  <p className="m-10 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et inventore debitis voluptatum hic modi voluptas itaque expedita quis labore quaerat facere odio autem ducimus assumenda animi aspernatur, aperiam asperiores, praesentium magni deleniti! Recusandae, facere. Amet pariatur hic iste accusantium aliquid laboriosam possimus doloremque recusandae dignissimos libero, nulla cupiditate, delectus illo.</p>
                </div>
                <div className="bg-white p-4 rounded-lg hover:shadow-lg">
                  <h1 className="text-center text-2xl p-4 font-semibold">Box 3 Title</h1>
                  <p className="m-10 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur atque iusto assumenda quia illo eligendi! Voluptatem, nostrum voluptas! Distinctio esse minus facilis cum ipsam recusandae. Minus ut qui eos sunt quas et ipsam, consectetur eligendi aut velit molestiae. Blanditiis laudantium alias ex labore rerum pariatur necessitatibus ipsam neque inventore amet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
