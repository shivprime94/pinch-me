import React from 'react';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';

const About = () => {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 5}}>
			<ScrollView>
				<Text style={styles.heading}>Disclaimer</Text>
				<Text style={styles.text}>
					“CRYPTO PRODUCTS AND NFTS ARE UNREGULATED AND CAN BE HIGHLY
					RISKY. THERE MAY BE NO REGULATORY RECOURSE FOR ANY LOSS FROM
					SUCH TRANSACTIONS. OUR USERS (“YOU”, “YOUR”) SHOULD BE AWARE
					OF SUCH RISKS. WE AT STINT INFOTECH PVT. LTD. (“WE”, “US”,
					“OUR”) HAVE ATTEMPTED TO HIGHLIGHT THE KEY RISKS ASSOCIATED
					WITH THE USE OF THE PINCH PLATFORM IN THIS DISCLAIMER.
					PLEASE DO NOT USE THE PINCH PLATFORM UNTIL AFTER YOU HAVE
					READ THESE DISCLAIMERS AS WELL AS OUR TERMS OF USE. THESE
					DISCLAIMERS FORM A PART OF OUR TERMS OF USE.
				</Text>

				<Text style={styles.heading}>Market and Trading Risks</Text>
				<Text style={styles.text}>
					Crypto Assets Market Risk: Market prices for crypto assets
					can be volatile and highly unpredictable. We make no
					representations or warranties about whether crypto-assets
					will continue to trade in the trading market or be available
					for sale or purchase. {'\n'}
					{'\n'}Liquidity Risk: The markets for crypto assets may
					become “illiquid”, i.e., there can be a scarcity of persons
					who are willing to trade at any one time. There is no
					guarantee that the markets for any crypto assets will be
					active and liquid or permit you to establish or liquidate
					positions in the crypto assets when desired or at favourable
					prices. Market {'\n'}
					{'\n'}Default Risk: We are not a counterparty to any trade
					and have no financial responsibility or liability for any
					failure of market participants to honor their financial
					obligations. There is always a risk that one or more market
					participants will renege, default, or otherwise fail to
					honor their financial obligations or will be unwilling or
					unable to abide by the terms of their agreements. If risk
					materialises, you may likely incur financial losses or
					reductions in gains from your open positions in crypto
					assets.
				</Text>
				<Text style={styles.heading}>
					Platform Risks and Disclaimers
				</Text>
				<Text style={styles.text}>
					Advisory Disclaimer: Please bear in mind that we are not
					your financial or investment or legal advisors. Any
					information available on the Pinch Platform is for general
					use only and it is not our intention that you should rely on
					the same to purchase crypto-assets. The proportions within
					which assets are distributed in a preview is suggestive, and
					you should invest in cryptos basis the previews, only after
					due research. If you choose to act on any such content the
					same shall be at your sole risk and cost and we will bear no
					liability for the same. In no event shall we be liable for
					any direct, indirect, consequential or other damages arising
					or connected with the use of the Pinch Platform or the
					information herein. {'\n'}
					{'\n'}Third-Party Content: Links to other internet sites or
					third-party services on the Pinch Platform are included for
					your convenience. When a linked site is accessed, you are
					accessing an independent website over which we have no
					control. We do not endorse any such third-party services or
					vouch for their fitness for use. {'\n'}
					{'\n'}Service Only: The Pinch Platform is not intended as a
					solicitation or offering of securities in any jurisdiction
					and the information contained herein in no way should be
					construed or interpreted as such. {'\n'}
					{'\n'}Service Availability: Since a purchase or sale order
					is actually executed on third-party crypto-exchanges, such
					as Bitbns and Binance, the provision of purchasing
					crypto-assets in accordance with and pursuant to the Pinch
					Platform is contingent on the continued availability of such
					exchange, and your account thereon. Similarly, the custody
					of your crypto-assets rests with Bitbns, Binance or your
					crypto wallet provider. {'\n'}
					{'\n'}We will not be liable if you are not able to purchase
					or sell any of the crypto-asset if the crypto exchanges
					cease to provide you or us their services. We have no
					control over and assume no responsibility for the content,
					privacy policies, or practices of such third-party crypto
					exchanges. We strongly advise you to read the applicable
					terms and conditions of such third-party crypto exchanges.
					For Bitbns and Binance, these terms and conditions are
					available on their websites, as mentioned here respectively,
					Bitbns and Binance {'\n'}
					{'\n'}Fitness for Use: We do not guarantee or warrant that
					the Pinch Platform will be free from viruses, worms, trojans
					or other code containing destructive or contaminating
					properties, despite our best efforts to keep the Pinch
					Platform free from such properties. We may partially or
					completely suspend access to the Pinch Platform on the
					occurrence of certain contingencies, with or without prior
					notification to you. In such circumstances, we will be
					exempted from responsibility for any damage that you may
					suffer.
				</Text>
				<Text style={styles.heading}>
					Legal, Banking and Account Risk
				</Text>
				<Text style={styles.text}>
					Legal Risk: You acknowledge that there is a risk of
					crypto-assets being delegitimized or being declared illegal.
					Further, a change in regulation may prohibit the provision
					of our services to you. {'\n'}
					{'\n'}Pinch Account Risk: You alone are responsible for
					maintaining the operation and safety of your Pinch Account
					and making sure that the same is maintained in accordance
					with our applicable policies. Unless provided otherwise, any
					transaction made through your Pinch Account shall be
					irreversible and permanent in nature. Should you delete your
					user account and/or lose your private key you may
					irreversibly lose all your crypto assets. Further, should we
					apprehend that your account is being used for criminal
					activities we will be entitled to freeze your account or
					take any further action.
				</Text>
				<Text style={styles.heading}>Limitation of Liability</Text>
				<Text style={styles.text}>
					We shall not be liable for any claims, expenses, damages
					(including direct, indirect, special, incidental, punitive
					or consequential damages), loss of profits, opportunities or
					information arising from:
					{'\n'}
					{'\n'}
					The use of or reliance on information contained on the Pinch
					Platform; or {'\n'}
					{'\n'}Any inaccuracy or omission in such information or
					failure to keep the information updated; or {'\n'}
					{'\n'}Use of any third-party websites linked to the Pinch
					Platform; or
					{'\n'}
					{'\n'}Any internet software used in connection with the
					Pinch Platform or computer viruses or other destructive
					programs encountered from the use of the Pinch Platform; or{' '}
					{'\n'}
					{'\n'}Any delays, inaccuracies, or errors in, or in the
					transmission of, any crypto-asset prices or historical price
					data; or {'\n'}
					{'\n'}Any technical, hardware or software failures of any
					kind; or
					{'\n'}
					{'\n'}Lost or unavailable network connections; or {'\n'}
					{'\n'}
					Incomplete, garbled or delayed computer transmissions; and{' '}
					{'\n'}
					{'\n'}Any other matter relating to the Pinch Platform, even
					if we are made aware of the possibility of such claims,
					expenses, damages or losses. {'\n'}
					{'\n'}To the fullest extent permitted under applicable law,
					under no circumstances shall we be liable for any damages or
					injury that results from the use of the materials on the
					Pinch Platform.
				</Text>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	heading: {
		fontSize: 20,
		fontFamily: 'Montserrat-Bold',
		color: '#000',
		margin: 8,
		lineHeight: 24
	},
	text: {
		fontSize: 16,
		margin: 8,
		color: '#1F1F1F',
		fontFamily: 'Montserrat-Regular',
		lineHeight: 20
	}
});

export default About;
