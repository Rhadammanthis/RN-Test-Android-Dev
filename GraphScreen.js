import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Circle, Text as SVGText, Rect, G } from 'react-native-svg'
import {
  Button,
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const GraphScreen = props => {

  //Hardcoded dataset
  const data = [
    {
      country: 'Iceland',
      cases: [{ cases: 0, date: 1583020800000 },
      { cases: 2, date: 1583107200000 },
      { cases: 9, date: 1583193600000 },
      { cases: 16, date: 1583280000000 },
      { cases: 26, date: 1583366400000 },
      { cases: 26, date: 1583452800000 },
      { cases: 45, date: 1583539200000 },
      { cases: 45, date: 1583625600000 },
      { cases: 55, date: 1583712000000 },
      { cases: 55, date: 1583798400000 },
      { cases: 61, date: 1583884800000 },
      { cases: 61, date: 1583971200000 },
      { cases: 61, date: 1584057600000 },
      { cases: 61, date: 1584144000000 },]
    },
    {
      country: 'The Netherlands',
      cases: [{ cases: 7, date: 1583020800000 },
      { cases: 13, date: 1583107200000 },
      { cases: 18, date: 1583193600000 },
      { cases: 28, date: 1583280000000 },
      { cases: 38, date: 1583366400000 },
      { cases: 82, date: 1583452800000 },
      { cases: 128, date: 1583539200000 },
      { cases: 188, date: 1583625600000 },
      { cases: 265, date: 1583712000000 },
      { cases: 321, date: 1583798400000 },
      { cases: 382, date: 1583884800000 },
      { cases: 503, date: 1583971200000 },
      { cases: 614, date: 1584057600000 },
      { cases: 804, date: 1584144000000 },]
    }
  ]

  //Looks up a country in the dataset and returns the first instance
  const retrieveData = (country) => {
    let result = data.filter(obj => {
      return obj.country === country
    })
    return result[0]
  }

  //Used to dynamically change the chart's data
  const [chartData, setChartData] = useState(retrieveData('Iceland'))

  const Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
        <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
      </LinearGradient>
    </Defs>)

  const Decorator = ({ x, y, data }) => {
    return data.map((value, index) => (
      <Circle
        key={index}
        cx={x(value.date)}
        cy={y(value.cases)}
        r={4}
        stroke={'rgb(134, 65, 244)'}
        fill={'white'}
      />
    ))
  }

  //Use to calculate when should the tooltip be drawn above or below the decorator
  const calcCutOff = (arr) => {
    let min = arr[0].cases, max = arr[0].cases;

    for (let i = 1, len = arr.length; i < len; i++) {
      let v = arr[i].cases;
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    }

    return (max - min) * 0.5
  }

  const CUT_OFF = calcCutOff(chartData.cases)

  const Labels = ({ x, y, bandwidth, data }) => (
    data.map((value, index) => (
      <G
        key={index}>
        <Rect
          x={x(value.date) - (10 + value.cases.toString().length * 5) / 2}
          y={value.cases < CUT_OFF ? y(value.cases) - 27.5 : y(value.cases) + 2.5}
          width={10 + value.cases.toString().length * 5}
          height="25"
          strokeWidth="1"
          fill='rgb(66, 194, 244)'>

        </Rect>
        <SVGText
          x={x(value.date)}
          y={value.cases < CUT_OFF ? y(value.cases) - 15 : y(value.cases) + 15}
          fontSize={14}
          fill={'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value.cases}
        </SVGText>
      </G>
    ))
  )

  const formatDate = (value) => {
    let date = new Date(value);
    return `${date.getMonth() + 1}/${date.getDay() + 1}/20`
  }

  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 20, bottom: 20 }
  const chartContentInset = { top: 20, bottom: 20, left: 15, right: 25 }
  const xAxisHeight = 30

  return <View style={{ flex: 1 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 5 }}>
      <Button title={"Iceland"} onPress={() => setChartData(retrieveData('Iceland'))}></Button>
      <Button title={"Netherlands"} onPress={() => setChartData(retrieveData('The Netherlands'))}></Button>
    </View>
    <Text style={{ textAlign: 'center', fontSize: 20 }}>Coronavirus cases in {chartData.country}</Text>
    <View style={styles.container}>
      <YAxis
        data={chartData.cases}
        yAccessor={({ item }) => item.cases}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={10}
      />
      <ScrollView horizontal={true} >
        <View>
          <LineChart
            yAccessor={({ item }) => item.cases}
            xAccessor={({ item }) => item.date}
            animate={true}
            style={{ flexGrow: 1, width: chartData.cases.length * 50 }}
            data={chartData.cases}
            contentInset={chartContentInset}
            svg={{
              strokeWidth: 2,
              stroke: 'url(#gradient)',
            }}
          >
            <Decorator />
            <Labels />
            <Grid />
            <Gradient />
          </LineChart>
          <XAxis
            contentInset={chartContentInset}
            style={{ height: xAxisHeight }}
            xAccessor={({ item }) => item.date}
            data={chartData.cases}
            svg={axesSvg}
            formatLabel={(value) => formatDate(value)}
          />
        </View>
      </ScrollView>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'row', 
    paddingLeft: 10 
  }
});

export default GraphScreen;