export function getCurrentLocation() {
	return new Promise((executor, reject) => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				executor({
					latitude: coords.latitude,
					longitude: coords.longitude
				});
			},
			() => {
				reject()
			}
		);
	});
}
