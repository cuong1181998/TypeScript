//1. union types
function padLeft (value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft("Hello world", 4); // -> returns "   Hello world"
// let indentedString = padLeft("Hello world", true); // -> any failure add run time padding: string | number failure at compiler time

interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// Only available in one of the two possible types
// pet.swim(); -> failure


// 2. Discriminating Unions
// type NetworkLoadingState = {
//   state: "loading";
// };

// type NetworkFailedState = {
//   state: "failed";
//   code: number;
// };

// type NetworkSuccessState = {
//   state: "success";
//   response: {
//     title: string;
//     duration: number;
//     summary: string;
//   };
// };

// // Create a type which represents only one of the above types
// // but you aren't sure which it is yet.
// type NetworkState =
//   | NetworkLoadingState
//   | NetworkFailedState
//   | NetworkSuccessState;



//   function networkStatus(state: NetworkState): string {
//     // state.code; -> error not share

//     switch (state.state) {
//       case "loading":
//         return "Downloading...";
//       case "failed":
//         return `Error ${state.code} downloading`;
//       case "success":
//         return `Downloaded ${state.response.title} - ${state.response.summary}`;
//     }
//   }

// 3. Union Exhaustiveness checking
type NetworkLoadingState = { state: "loading" };
type NetworkFailedState = { state: "failed"; code: number };
type NetworkSuccessState = { state: "success" };
type NetworkFromCachedState = { state: "from_cache"; }

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState
  | NetworkFromCachedState;


  function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
  }

  function logger(s: NetworkState): string {
  switch (s.state) {
    case "loading":
      return "loading request";
    case "failed":
      return `failed with code ${s.code}`;
    case "success":
      return "got response"
      default: 
      // return assertNever(s) // -> help us know whenever forget any case in compiler 
  }
}

// 4. Intersection types

interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

type ArtworksResponse = ArtworksData & ErrorHandling; // intersection
type ArtistsResponse = ArtistsData & ErrorHandling; // intersection

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};