import React, { useCallback, useEffect, useState } from 'react'

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import { BottomNavigation, Text } from 'react-native-paper';

import { useHeaderContext } from '../../../shared/contexts/header.context';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

interface StudentDetailsParams {
    studentId: string
}

const StudentDetails = ({ route }: any) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'music', title: 'Music', icon: 'queue-music' },
      { key: 'albums', title: 'Albums', icon: 'album' },
      { key: 'recents', title: 'Recents', icon: 'history' },
    ])

    const { actions } = useHeaderContext()
  
    const renderScene = BottomNavigation.SceneMap({
      music: MusicRoute,
      albums: AlbumsRoute,
      recents: RecentsRoute,
    })

    useFocusEffect(
      useCallback(() => {
          const { id, name } = route.params
          actions.setActionBarTitle(name)
      }, [])
    )

    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    )
  }

export default StudentDetails
