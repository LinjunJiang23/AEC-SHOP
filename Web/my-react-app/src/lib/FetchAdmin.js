/* (option === "carttotal") {
	  try {
			const response = await fetch('http://localhost:3001/CustomerRoute/carttotal',{
				method: 'GET',
				credentials: 'include'
			});
			if (!response.ok) {
				return false;
			}
			const results = await response.json();
			console.log("The cart total get is:", results);
			return results;
	  } catch (error) {
			console.error('Error fetching cart total');
			return false;
	  }
  }
} */