export const fetchLaunches = () => {
    return fetch('http://localhost:8001/launches')
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error fetching launches:', error);
      });
};
  
export const fetchLaunchPads = () => {
return fetch('http://localhost:8001/launchpads')
    .then((response) => response.json())
    .catch((error) => {
    console.error('Error fetching launchpads:', error);
    });
};