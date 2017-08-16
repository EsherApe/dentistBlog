const mongoose = require('./libs/mongoose');
const Article = require('./models/article');

let art = new Article({
  title: "Test Article",
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a fringilla elit, eu mattis arcu.
            Curabitur augue augue, scelerisque sit amet varius eget, tristique at nisl. In euismod suscipit
            tristique. Nulla sollicitudin pretium massa sit amet tristique.</p><p>Aenean porta quam quis tempus posuere. 
            Integer tempor, elit in auctor scelerisque, arcu augue
            rhoncus mauris, et hendrerit sem tellus vitae eros. Nulla feugiat ultrices posuere. Nullam aliquet
            dolor orci. Curabitur tincidunt sem et libero dignissim, sed molestie felis ultricies. Phasellus
            malesuada tellus vitae eros bibendum, nec ultricies massa sollicitudin. Etiam justo neque, faucibus
            quis urna interdum, interdum rutrum massa. Mauris et velit ac dolor luctus fringilla. Integer in
            mattis dui, eget eleifend mauris. Fusce sagittis ipsum nec est finibus, vitae congue nunc elementum.
            Morbi imperdiet nisl sem, at commodo leo posuere a. Maecenas eu laoreet lorem. Aenean fringilla
            cursus augue, sed mollis dui.</p><blockquote><p>Your time is limited, so don't waste it living someone 
            else's life. Don't be trapped by dogma -
            which is living with the results of other people's thinking. Don't let the noise of others'
            opinions drown out your own inner voice. And most important, have the courage to follow your
            heart and intuition.</p><footer><cite>Steve Jobs</cite></footer></blockquote><p>Praesent ac quam sed magna 
            gravida interdum. Vivamus sed nunc lobortis, tempor ante ut, gravida
            nibh. Praesent sed euismod odio. Maecenas dui dui, euismod quis lobortis quis, dignissim ut eros.
            Curabitur cursus lacinia sollicitudin. Aenean vitae erat imperdiet, egestas nisi non, placerat
            sapien. In nec commodo justo. Nunc posuere lacinia neque eu malesuada. Sed lacus lacus, tincidunt
            id faucibus eget, sagittis sed enim. Nunc nec dapibus odio.</p>`,
  author: "Chubarova",
  category: "Test",
  tags: ["test", "dentist", "tooth"],
  imgUrl: '/static/img/blog/blog_post_2_full.jpg'
});

art.save(err => {
  mongoose.disconnect();

  if (err) return console.log(err);

  console.log("Статья сохранена!", art);
});

// db.dropDatabase(err => {
//   if (err) throw err;
//   console.log('Ok');
// })