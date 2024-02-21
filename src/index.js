// index.js

//Ramen Image Grabbers
const ramenNameSelected = document.querySelector(".name")
const ramenRestaurantSelected = document.querySelector(".restaurant")
const ramenImgSelected = document.querySelector(".detail-image")
const ramenImgRatingSelected = document.querySelector("#rating-display")
const ramenImgCommentSelected = document.querySelector("#comment-display")
//Ramen Form Grabbers
const newRamenForm = document.querySelector("#new-ramen")
const editRamenForm = document.querySelector("#edit-ramen")
// Callbacks
const handleClick = (ramen) => {
  // Add code
  console.log("Ramen Selected:", ramen)

  ramenImgSelected.src = `${ramen.image}`
  ramenNameSelected.textContent = `${ramen.name}`
  ramenRestaurantSelected.textContent = `${ramen.restaurant}`
  ramenImgRatingSelected.textContent = `${ramen.rating}`
  ramenImgCommentSelected.textContent = `${ramen.comment}`

  handleEdit(ramen)
  handleDelete(ramen)
};

const handleDelete = (ramen) => {
  const deleteBtns = document.querySelectorAll(".delete-button")
  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/ramens/${ramen.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then(res => res.json())
    })
  })
}

const handleEdit = (ramen) => {
  editRamenForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const updatedRating = document.getElementById("edit-rating").value
    const updatedComment = document.getElementById("edit-comment").value

    fetch(`http://localhost:3000/ramens/${ramen.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        rating: updatedRating,
        comment: updatedComment,
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })


  })

}

const addSubmitListener = () => {
  // Add code
  newRamenForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("new-name").value
    const restaurant = document.getElementById("new-restaurant").value
    const image = document.getElementById("new-image").value
    const rating = document.getElementById("new-rating").value
    const comment = document.getElementById("new-comment").value

    const ramenObj = {
      name: name,
      restaurant: restaurant,
      image: image,
      rating: rating,
      comment: comment,
    }



    fetch(`http://localhost:3000/ramens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(ramenObj)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  })
}

const displayRamens = () => {
  // Add code
  const ramenMenuContainer = document.querySelector("#ramen-menu")
  fetch(`http://localhost:3000/ramens`)
    .then(res => res.json())
    .then(data => data.forEach(ramen => {
      const ramenMenu = document.createElement("img")
      ramenMenu.src = `${ramen.image}`
      ramenMenu.classList.add("ramenImg")
      ramenMenuContainer.appendChild(ramenMenu)

      //adds event listner to each image as it is created
      ramenMenu.addEventListener("click", () => {
        console.log("Image clicked")
        handleClick(ramen)
      })
    }))
    .catch(error => {
      console.log("Error Fetching Ramens:", error)
    })
};



const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
