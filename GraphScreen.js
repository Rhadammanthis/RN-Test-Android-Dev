import React, { useState, useMemo } from 'react';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Circle, Text, Rect, G } from 'react-native-svg'
import {
  Button,
  StyleSheet,
  View,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const GraphScreen = props => {

  const casesIceland = [{ cases: 0, death: 0, date: 1583020800000 },
  { cases: 2, death: 0, date: 1583107200000 },
  { cases: 9, death: 0, date: 1583193600000 },
  { cases: 16, death: 0, date: 1583280000000 },
  { cases: 26, death: 0, date: 1583366400000 },
  { cases: 26, death: 0, date: 1583452800000 },
  { cases: 45, death: 0, date: 1583539200000 },
  { cases: 45, death: 0, date: 1583625600000 },
  { cases: 55, death: 0, date: 1583712000000 },
  { cases: 55, death: 0, date: 1583798400000 },
  { cases: 61, death: 0, date: 1583884800000 },
  { cases: 61, death: 0, date: 1583971200000 },
  { cases: 61, death: 0, date: 1584057600000 },
  { cases: 61, death: 0, date: 1584144000000 },
  ]
  const casesNetherlands = [{ cases: 7, death: 0, date: 1583020800000 },
  { cases: 13, death: 0, date: 1583107200000 },
  { cases: 18, death: 0, date: 1583193600000 },
  { cases: 28, death: 0, date: 1583280000000 },
  { cases: 38, death: 0, date: 1583366400000 },
  { cases: 82, death: 0, date: 1583452800000 },
  { cases: 128, death: 0, date: 1583539200000 },
  { cases: 188, death: 0, date: 1583625600000 },
  { cases: 265, death: 0, date: 1583712000000 },
  { cases: 321, death: 0, date: 1583798400000 },
  { cases: 382, death: 0, date: 1583884800000 },
  { cases: 503, death: 0, date: 1583971200000 },
  { cases: 614, death: 0, date: 1584057600000 },
  { cases: 804, death: 0, date: 1584144000000 },
  ]

  const [chartData, setChartData] = useState(casesIceland)

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
        r={7}
        stroke={'rgb(134, 65, 244)'}
        fill={'white'}
      />
    ))
  }

  const CUT_OFF = 20
  const Labels = ({ x, y, bandwidth, data }) => (
    data.map((value, index) => (
      <G
        key={index}>
        <Rect
          x={x(value.date) - 10}
          y={value.cases < CUT_OFF ? y(value.cases) - 27.5 : y(value.cases) + 2.5}
          width={20}
          height="25"
          strokeWidth="1"
          fill='rgb(66, 194, 244)'>

        </Rect>
        <Text
          x={x(value.date)}
          y={value.cases < CUT_OFF ? y(value.cases) - 15 : y(value.cases) + 15}
          fontSize={14}
          fill={'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}
        >
          {value.cases}
        </Text>
      </G>
    ))
  )

  const formatDate = (value) => {
    let date = new Date(value);
    return `${date.getMonth() + 1}/${date.getDay() + 1}/20`
  }

  const axesSvg = { fontSize: 10, fill: 'grey' };
  const verticalContentInset = { top: 10, bottom: 10 }
  const xAxisHeight = 30

  return <View style={{ flex: 1 }}>
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <Button title={"Iceland"} onPress={() => setChartData(casesIceland)}></Button>
      <Button title={"Netherlands"} onPress={() => setChartData(casesNetherlands)}></Button>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 10 }}>
      <YAxis
        data={chartData}
        yAccessor={({ item }) => item.cases}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
        numberOfTicks={10}
      />
      <ScrollView horizontal={true} style={{ flex: 1 }}>
        <View style={{ width: 500 }}>
          <LineChart
            yAccessor={({ item }) => item.cases}
            xAccessor={({ item }) => item.date}
            animate={true}
            style={{ height: 500 }}
            data={chartData}
            contentInset={{ top: 20, bottom: 20, left: 15, right: 15 }}
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
            numberOfTicks={5}
            style={{ marginHorizontal: 10, height: xAxisHeight }}
            xAccessor={({ item }) => item.date}
            data={chartData}
            svg={axesSvg}
            formatLabel={(value) => formatDate(value)}
          />
        </View>
      </ScrollView>
    </View>
  </View>
}

export default GraphScreen;