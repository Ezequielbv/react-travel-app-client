const map = useRef(null);
const mapContainerRef = useRef(null);
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API; // your mapbox api  

useEffect(() => {
    if (map.current) return; // Checks if there's an already existing map initialised.
    
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 9,
      center: [3.361881, 6.672557],
    });
    
    // clean up on unmount
    return () => map.current.remove();
  }, [])

  