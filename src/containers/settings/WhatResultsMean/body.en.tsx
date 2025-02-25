/*
   Copyright 2021 Queen’s Printer for Ontario

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import React, {FC} from 'react';
import {Linking} from 'react-native';
import {Button} from 'components/core/button';
import {
  B,
  P,
  UL,
  LI,
  SubContainer,
  ResultDescription,
  ResultDescriptionLast,
  LinkText,
} from 'containers/settings/styles';
import {
  SuccessResult,
  WarningResult,
  ErrorResult,
  TimeoutResult,
} from 'components/results/result';
import useTelLink from 'utils/useTelLink';
import openURL from 'utils/openURL';
import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';

interface Props {
  screenReaderEnabled: boolean;
}

const BodyEn: FC<Props> = ({screenReaderEnabled}) => {
  const telLink = useTelLink('1-833-943-3900');

  return (
    <>
      <SubContainer>
        <P>This app verifies that:</P>
        <UL>
          <LI>a visitor’s QR code meets the Ontario requirements for entry</LI>
        </UL>
        <P>
          When the app scans a QR code, there are <B>3</B> possible results or
          the scanner times out:
        </P>
        <UL>
          <LI>Verified</LI>
          <LI>There is a problem (includes third-party certificates)</LI>
          <LI>Invalid certificate</LI>
        </UL>
      </SubContainer>
      <SuccessResult />
      <ResultDescription>
        <P>
          This vaccine certificate <B>meets the Ontario requirements</B> for
          entry.
        </P>
      </ResultDescription>
      <WarningResult />
      <ResultDescription>
        <P>For example, the QR code may be:</P>
        <UL>
          <LI>issued to a child under age 12</LI>
          <LI>
            issued by a province, territory or country that uses a different
            type of QR code
          </LI>
          <LI>
            made by a third-party service not associated with the government of
            Ontario
          </LI>
        </UL>
        <P>
          Staff can review the person’s paper certificate and a piece of
          identification instead. Children under age 12 can be allowed entry,
          they do not have to show proof of vaccination.
        </P>
        <P>
          For more help, visit{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/vaccine-proof-help',
                true,
                'ontario.ca/vaccine-proof-help',
              );
            }}>
            ontario.ca/vaccine-proof-help
          </LinkText>
        </P>
        {screenReaderEnabled && (
          <Button
            buttonType="secondary"
            onPress={() =>
              openURL(
                'https://www.ontario.ca/vaccine-proof-help',
                true,
                'Visit ontario.ca/vaccine-proof-help',
              )
            }>
            Visit ontario.ca/vaccine-proof-help
          </Button>
        )}
      </ResultDescription>
      <ErrorResult />
      <ResultDescription>
        <P>
          This vaccine certificate <B>does not meet the Ontario requirements</B>{' '}
          for entry.
        </P>
        <P>Staff should:</P>
        <UL>
          <LI>
            let the visitor know this certificate <B>can not</B> be accepted for
            entry
          </LI>
          <LI>
            the QR code may indicate <B>the visitor has only one vaccination</B>
          </LI>
          <LI>
            <B>14 days</B> may have <B>not passed</B> since the visitor got
            their second dose
          </LI>
          <LI>
            let the visitor know that if they have had a second dose and 14 days
            have passed, they should <B>download their most recent</B> enhanced
            vaccine certificate with official QR code
          </LI>
          <LI>
            redirect the visitor to{' '}
            <LinkText
              onPress={() => {
                openURL(
                  'https://www.ontario.ca/verify-results',
                  true,
                  'ontario.ca/verify-results',
                );
              }}>
              ontario.ca/verify-results
            </LinkText>{' '}
            or{' '}
            {telLink ? (
              <LinkText
                onPress={() => {
                  trackLogEvent(verifyEvent.LINK_CLICK, {
                    outbound: true,
                    link_url: 'phone',
                    link_text: '1-833-943-3900',
                  });
                  Linking.openURL(telLink);
                }}>
                1-833-943-3900
              </LinkText>
            ) : (
              '1-833-943-3900'
            )}
          </LI>
        </UL>
        {screenReaderEnabled && (
          <Button
            buttonType="secondary"
            onPress={() =>
              openURL(
                'https://www.ontario.ca/verify-results',
                true,
                'Visit ontario.ca/verify-results',
              )
            }>
            Visit ontario.ca/verify-results
          </Button>
        )}
        {telLink && screenReaderEnabled && (
          <Button
            buttonType="secondary"
            onPress={() => {
              trackLogEvent(verifyEvent.LINK_CLICK, {
                outbound: true,
                link_url: 'phone',
                link_text: 'Call 1-833-943-3900',
              });
              Linking.openURL(telLink);
            }}>
            Call 1-833-943-3900
          </Button>
        )}
      </ResultDescription>
      <TimeoutResult />
      <ResultDescriptionLast>
        <P>
          <B>The device’s camera could not find a QR code.</B>
        </P>
        <P>What to do next:</P>
        <UL>
          <LI>wipe the camera lens</LI>
          <LI>turn the flashlight on or off</LI>
          <LI>if the QR code is printed on paper, try to flatten the paper</LI>
          <LI>
            if the QR code is on a device, turn up the brightness of the
            device’s screen
          </LI>
          <LI>make sure light is not reflecting on the QR code</LI>
          <LI>try to scan again</LI>
        </UL>
        <P>
          If the scanner continues to time out, review the visitor’s
          government-issued paper or digital vaccine certificate and a piece of
          identification.
        </P>
      </ResultDescriptionLast>
    </>
  );
};
export default BodyEn;
