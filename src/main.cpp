#include <SFML/Graphics.hpp>

auto main() -> int {
	sf::RenderWindow window(sf::VideoMode({800, 600}), "SFML works!");

	sf::RectangleShape shape({100, 100});
	shape.setPosition({100, 100});
	shape.setFillColor(sf::Color::Green);

	while (window.isOpen()) {
		while (std::optional event = window.pollEvent()) {
			if (event->is<sf::Event::Closed>()) {
				window.close();
			}
		}

		window.clear(sf::Color::White);
		window.draw(shape);
		window.display();
	}

	return 0;
}
