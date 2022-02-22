//import { useEffect, useState } from "react";
import Head from "next/head";
import { Fragment } from "react/cjs/react.production.min";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

/*const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "https://wallpaperaccess.com/full/31505.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a frist meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "https://wallpaperaccess.com/full/31505.jpg",
    address: "Some address 5, 12345 Some City",
    description: "This is a frist meetup!",
  },
];*/

function HomePage(props) {
  /* //I use asnyc instant this
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(() => {
    // sed a http request and fetch data
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);*/

  return(
  <Fragment>
      <Head>
        <title>Nani Meetups</title>
      </Head>
    <MeetupList meetups={props.meetups} />;
  </Fragment>
  );
  //return <MeetupList meetups={loadedMeetups} />;
}

// This better then getStaticPreops bebase it's guaranteed to run for every request
/*export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  // fetch data from an API
  // Run on server side
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}*/

export async function getStaticProps() {
  // fetch data from an API or database

  //fetch('/api/meetups');
  const client = await MongoClient.connect(
    "mongodb+srv://mongodb_na:PukfZ7cXkAt6bz8d@cluster0.pnqdh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    // props line 21
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //3600 = 1hour
  };
}

export default HomePage;
