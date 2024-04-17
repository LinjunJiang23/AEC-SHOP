const connection = require('../db');


const insert_shopping_cart_item_before_trigger = `
	CREATE TRIGGER insert_shopping_cart_item_before_trigger
	BEFORE INSERT ON Shopping_Cart_Item
	FOR EACH ROW
	BEGIN
		-- Check if Shopping_Cart has the cart for this user
		IF ((SELECT cart_id FROM Shopping_Cart WHERE user_id = NEW.user_id) IS NULL) THEN
			-- If not, create one for the user
			INSERT INTO Shopping_Cart (user_id) VALUES (NEW.user_id);
		END IF;
	END;

`;

const insert_shopping_cart_item_after_trigger = `
	CREATE TRIGGER insert_shopping_cart_item_after_trigger
	AFTER INSERT ON Shopping_Cart_Item
	FOR EACH ROW
	BEGIN
		DECLARE total_quantity DECIMAL(10, 2);

		-- Update cart_id, per_price, and subtotal in Shopping_Cart_Item
		UPDATE Shopping_Cart_Item
		SET cart_id = (SELECT cart_id FROM Shopping_Cart WHERE user_id = NEW.user_id),
			per_price = (SELECT price FROM Product WHERE product_id = NEW.product_id),
			subtotal = (SELECT price * NEW.quantity FROM Product WHERE product_id = NEW.product_id)
		WHERE product_id = NEW.product_id;

		-- Calculate total_quantity
		SELECT SUM(quantity) INTO total_quantity FROM Shopping_Cart_Item WHERE user_id = NEW.user_id;

		-- Update Shopping_Cart quantity and cart_total
		UPDATE Shopping_Cart
		SET quantity = total_quantity,
			cart_total = (SELECT SUM(subtotal) FROM Shopping_Cart_Item WHERE cart_id = NEW.cart_id)
		WHERE cart_id = NEW.cart_id;
	END;
`;

const update_shopping_cart_item_after_trigger = `
	CREATE TRIGGER update_shopping_cart_item_after_trigger
	AFTER UPDATE 
	ON Shopping_Cart_Item
	FOR EACH ROW
	BEGIN
		-- Check if there's an update in quantity
		IF OLD.quantity <> NEW.quantity THEN
		
			-- Update subtotal in Shopping_Cart_Item
			UPDATE Shopping_Cart_Item 
			SET subtotal = (per_price * NEW.quantity) 
			WHERE product_id = NEW.product_id;
			
			-- Update total quantity in Shopping_Cart
			UPDATE Shopping_Cart 
			SET quantity = quantity + (NEW.quantity - OLD.quantity)  
			WHERE cart_id = NEW.cart_id;
			
			-- Update cart_total in Shopping_Cart
			UPDATE Shopping_Cart 
			SET cart_total = (SELECT SUM(subtotal) FROM Shopping_Cart_Item WHERE cart_id = NEW.cart_id) 
			WHERE cart_id = NEW.cart_id;
			
		END IF;
	END;

`;
connection.query(insert_shopping_cart_item_before_trigger, (err, results) => {
	if (err) {
		console.error('Error creating trigger:', err);
		return;
	}
	console.log('Trigger created successfully');
});

connection.query(insert_shopping_cart_item_after_trigger, (err, results) => {
	if (err) {
		console.error('Error creating trigger:', err);
		return;
	}
	console.log('Trigger created successfully');
});

connection.query(update_shopping_cart_item_after_trigger, (err, results) => {
	if (err) {
		console.error('Error creating trigger:', err);
		return;
	}
	console.log('Trigger created successfully');
});

connection.end();