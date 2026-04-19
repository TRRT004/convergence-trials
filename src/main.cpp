#include <SFML/System/Clock.hpp>
#include <SFML/System/Time.hpp>

#include <iostream>

int main()
{
    sf::Clock clock;
    const auto elapsedMicroseconds = clock.getElapsedTime().asMicroseconds();

    std::cout << "Convergence Trials SFML runtime scaffold compiled successfully."
              << " Elapsed us: " << elapsedMicroseconds << '\n';

    return 0;
}
