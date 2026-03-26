
Our project is a Context-Aware Smart Traffic Management System designed to replace traditional fixed-timer traffic signals with an adaptive, real-world data–driven approach. Instead of giving every road equal time, our system observes what is actually happening on the roads and intelligently decides which direction should receive the green signal first.

We simulate a four-road junction based on well-known Bengaluru locations: Silk Board, Marathahalli, KR Puram, and BTM Layout. Each of these roads generates different traffic patterns in real life, and our system mirrors those patterns through data simulation.

At the core of the project is a priority scoring model. Every road is evaluated using multiple contextual factors—vehicle density, emergency vehicle presence, pedestrian or crowd levels, weather conditions like rain, and school-zone timings. All these factors influence traffic flow in real Bengaluru streets, and our system assigns a dynamic priority score to each road based on these conditions.

When the user clicks Run, the system calculates the scores for all roads, compares them, and automatically selects the road with the highest priority to receive the green signal. This ensures that the most critical traffic flow is cleared first, reducing congestion and improving overall efficiency.

To make the system interactive, we include scenario buttons such as Rain Traffic, Festival Crowd, School Rush, and Emergency Mode. These instantly simulate real-world situations, allowing users to test how the system responds to different challenges. For example, heavy rain increases slow-moving traffic, while an ambulance approaching the junction boosts the emergency priority score.

A unique component of our solution is the AI Decision Panel, which clearly explains why a particular road was chosen. This adds transparency and makes the system explainable, not just automated—an important requirement in real-world AI deployment.

Finally, we provide a Before vs. After comparison, showing how waiting time and traffic buildup reduce significantly compared to a normal, fixed-timer system.

Overall, our smart traffic system is adaptive, context-aware, user-interactive, and suitable for improving urban traffic management in cities like Bengaluru.
