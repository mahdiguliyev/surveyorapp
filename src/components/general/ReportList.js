import React, {useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppText from '@components/AppText';
import ComponentLoader from '@components/ComponentLoader';
import ReportItem from './ReportItem';

export default function ReportList({data, headers}) {
  const [loading] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      {loading ? (
        <ComponentLoader />
      ) : (
        <View style={styles.global_container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={styles.account_container}>
              <View style={styles.account_accordion_content}>
                {data.map((item, index) => {
                  const indexKey = index + 1;
                  return (
                    <ReportItem key={indexKey} item={item} headers={headers} />
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
  account_container: {
    flex: 1,
  },

  product_header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  account_header_back: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  account_accordion_content: {
    marginTop: 20,
  },
});
